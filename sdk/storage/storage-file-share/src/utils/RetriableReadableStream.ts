// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortError } from "@azure/abort-controller";
import { TransferProgressEvent } from "@azure/core-rest-pipeline";
import { Readable } from "stream";

export type ReadableStreamGetter = (offset: number) => Promise<NodeJS.ReadableStream>;

export interface RetriableReadableStreamOptions {
  /**
   * Max retry count (greater than or equal to 0), undefined or invalid value means no retry
   */
  maxRetryRequests?: number;

  /**
   * Read progress event handler
   */
  onProgress?: (progress: TransferProgressEvent) => void;

  /**
   * Debug purpose only. Used to inject an unexpected end to existing internal stream,
   * to test stream retry works well or not.
   *
   * When assign it to true, for next incoming "data" event of internal stream,
   * RetriableReadableStream will try to emit an "end" event to existing internal
   * stream to force it end and start retry from the breaking point.
   * The value will then update to "undefined", once the injection works.
   */
  doInjectErrorOnce?: boolean;
}

/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * A Node.js ReadableStream will internally retry when internal ReadableStream unexpected ends.
 */
export class RetriableReadableStream extends Readable {
  private start: number;
  private offset: number;
  private end: number;
  private getter: ReadableStreamGetter;
  private source: NodeJS.ReadableStream;
  private retries: number = 0;
  private maxRetryRequests: number;
  private onProgress?: (progress: TransferProgressEvent) => void;
  private options: RetriableReadableStreamOptions;

  /**
   * Creates an instance of RetriableReadableStream.
   *
   * @param source - The current ReadableStream returned from getter
   * @param getter - A method calling downloading request returning
   *                                      a new ReadableStream from specified offset
   * @param offset - Offset position in original data source to read
   * @param count - How much data in original data source to read
   * @param options -
   */
  public constructor(
    source: NodeJS.ReadableStream,
    getter: ReadableStreamGetter,
    offset: number,
    count: number,
    options: RetriableReadableStreamOptions = {}
  ) {
    super();
    this.getter = getter;
    this.source = source;
    this.start = offset;
    this.offset = offset;
    this.end = offset + count - 1;
    this.maxRetryRequests =
      options.maxRetryRequests && options.maxRetryRequests >= 0 ? options.maxRetryRequests : 0;
    this.onProgress = options.onProgress;
    this.options = options;

    this.setSourceEventHandlers();
  }

  public _read(): void {
    this.source.resume();
  }

  private setSourceEventHandlers() {
    this.source.on("data", this.sourceDataHandler);
    this.source.on("end", this.sourceErrorOrEndHandler);
    this.source.on("error", this.sourceErrorOrEndHandler);
    // needed for Node14
    this.source.on("aborted", this.sourceAbortedHandler);
  }

  private removeSourceEventHandlers() {
    this.source.removeListener("data", this.sourceDataHandler);
    this.source.removeListener("end", this.sourceErrorOrEndHandler);
    this.source.removeListener("error", this.sourceErrorOrEndHandler);
    this.source.removeListener("aborted", this.sourceAbortedHandler);
  }

  private sourceDataHandler = (data: Buffer) => {
    if (this.options.doInjectErrorOnce) {
      this.options.doInjectErrorOnce = undefined;
      this.source.pause();
      this.sourceErrorOrEndHandler();
      (this.source as Readable).destroy();
      return;
    }

    // console.log(
    //   `Offset: ${this.offset}, Received ${data.length} from internal stream`
    // );
    this.offset += data.length;
    if (this.onProgress) {
      this.onProgress({ loadedBytes: this.offset - this.start });
    }
    if (!this.push(data)) {
      this.source.pause();
    }
  };

  private sourceAbortedHandler = () => {
    const abortError = new AbortError("The operation was aborted.");
    this.destroy(abortError);
  };

  private sourceErrorOrEndHandler = (err?: Error) => {
    if (err && err.name === "AbortError") {
      this.destroy(err);
      return;
    }

    // console.log(
    //   `Source stream emits end or error, offset: ${
    //     this.offset
    //   }, dest end : ${this.end}`
    // );
    this.removeSourceEventHandlers();
    if (this.offset - 1 === this.end) {
      this.push(null);
    } else if (this.offset <= this.end) {
      // console.log(
      //   `retries: ${this.retries}, max retries: ${this.maxRetries}`
      // );
      if (this.retries < this.maxRetryRequests) {
        this.retries += 1;
        this.getter(this.offset)
          .then((newSource) => {
            this.source = newSource;
            this.setSourceEventHandlers();
            return;
          })
          .catch((error) => {
            this.destroy(error);
          });
      } else {
        this.destroy(
          new Error(
            `Data corruption failure: received less data than required and reached maxRetires limitation. Received data offset: ${
              this.offset - 1
            }, data needed offset: ${this.end}, retries: ${this.retries}, max retries: ${
              this.maxRetryRequests
            }`
          )
        );
      }
    } else {
      this.destroy(
        new Error(
          `Data corruption failure: Received more data than original request, data needed offset is ${
            this.end
          }, received offset: ${this.offset - 1}`
        )
      );
    }
  };

  _destroy(error: Error | null, callback: (error?: Error) => void): void {
    // remove listener from source and release source
    this.removeSourceEventHandlers();
    (this.source as Readable).destroy();

    callback(error === null ? undefined : error);
  }
}
