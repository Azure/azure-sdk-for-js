import { RestError, TransferProgressEvent } from "@azure/ms-rest-js";
import { Readable } from "stream";

import { Aborter } from "../Aborter";

export type ReadableStreamGetter = (offset: number) => Promise<NodeJS.ReadableStream>;

export interface IRetriableReadableStreamOptions {
  /**
   * Max retry count (>=0), undefined or invalid value means no retry
   *
   * @type {number}
   * @memberof IRetriableReadableStreamOptions
   */
  maxRetryRequests?: number;

  /**
   * Read progress event handler
   *
   * @memberof IRetriableReadableStreamOptions
   */
  progress?: (progress: TransferProgressEvent) => void;

  /**
   * Debug purpose only. Used to inject an unexpected end to existing internal stream,
   * to test stream retry works well or not.
   *
   * When assign it to true, for next incoming "data" event of internal stream,
   * RetriableReadableStream will try to emit an "end" event to existing internal
   * stream to force it end and start retry from the breaking point.
   * The value will then update to "undefined", once the injection works.
   *
   * @type {boolean}
   * @memberof IRetriableReadableStreamOptions
   */
  doInjectErrorOnce?: boolean;
}

const ABORT_ERROR = new RestError("The request was aborted", RestError.REQUEST_ABORTED_ERROR);

/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * A Node.js ReadableStream will internally retry when internal ReadableStream unexpected ends.
 *
 * @class RetriableReadableStream
 * @extends {Readable}
 */
export class RetriableReadableStream extends Readable {
  private aborter: Aborter;
  private start: number;
  private offset: number;
  private end: number;
  private getter: ReadableStreamGetter;
  private source: NodeJS.ReadableStream;
  private retries: number = 0;
  private maxRetryRequests: number;
  private progress?: (progress: TransferProgressEvent) => void;
  private options: IRetriableReadableStreamOptions;
  private abortHandler = () => {
    this.source.pause();
    this.emit("error", ABORT_ERROR);
  };

  /**
   * Creates an instance of RetriableReadableStream.
   *
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {NodeJS.ReadableStream} source The current ReadableStream returned from getter
   * @param {ReadableStreamGetter} getter A method calling downloading request returning
   *                                      a new ReadableStream from specified offset
   * @param {number} offset Offset position in original data source to read
   * @param {number} count How much data in original data source to read
   * @param {IRetriableReadableStreamOptions} [options={}]
   * @memberof RetriableReadableStream
   */
  public constructor(
    aborter: Aborter,
    source: NodeJS.ReadableStream,
    getter: ReadableStreamGetter,
    offset: number,
    count: number,
    options: IRetriableReadableStreamOptions = {}
  ) {
    super();
    this.aborter = aborter;
    this.getter = getter;
    this.source = source;
    this.start = offset;
    this.offset = offset;
    this.end = offset + count - 1;
    this.maxRetryRequests =
      options.maxRetryRequests && options.maxRetryRequests >= 0 ? options.maxRetryRequests : 0;
    this.progress = options.progress;
    this.options = options;

    aborter.addEventListener("abort", this.abortHandler);

    this.setSourceDataHandler();
    this.setSourceEndHandler();
    this.setSourceErrorHandler();
  }

  public _read() {
    if (!this.aborter.aborted) {
      this.source.resume();
    }
  }

  private setSourceDataHandler() {
    this.source.on("data", (data: Buffer) => {
      if (this.options.doInjectErrorOnce) {
        this.options.doInjectErrorOnce = undefined;
        this.source.pause();
        this.source.removeAllListeners("data");
        this.source.emit("end");
        return;
      }

      // console.log(
      //   `Offset: ${this.offset}, Received ${data.length} from internal stream`
      // );
      this.offset += data.length;
      if (this.progress) {
        this.progress({ loadedBytes: this.offset - this.start });
      }
      if (!this.push(data)) {
        this.source.pause();
      }
    });
  }

  private setSourceEndHandler() {
    this.source.on("end", () => {
      // console.log(
      //   `Source stream emits end, offset: ${
      //     this.offset
      //   }, dest end : ${this.end}`
      // );
      if (this.offset - 1 === this.end) {
        this.aborter.removeEventListener("abort", this.abortHandler);
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
              this.setSourceDataHandler();
              this.setSourceEndHandler();
              this.setSourceErrorHandler();
            })
            .catch((error) => {
              this.emit("error", error);
            });
        } else {
          this.emit(
            "error",
            new Error(
              // tslint:disable-next-line:max-line-length
              `Data corruption failure: received less data than required and reached maxRetires limitation. Received data offset: ${this
                .offset - 1}, data needed offset: ${this.end}, retries: ${
                this.retries
              }, max retries: ${this.maxRetryRequests}`
            )
          );
        }
      } else {
        this.emit(
          "error",
          new Error(
            `Data corruption failure: Received more data than original request, data needed offset is ${
              this.end
            }, received offset: ${this.offset - 1}`
          )
        );
      }
    });
  }

  private setSourceErrorHandler() {
    this.source.on("error", (error) => {
      this.emit("error", error);
    });
  }
}
