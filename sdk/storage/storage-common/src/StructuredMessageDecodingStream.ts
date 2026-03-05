// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AbortError } from "@azure/abort-controller";
import { Readable } from "node:stream";
import { StructuredMessageDecoding } from "./StructuredMessageDecoding.js";

/**
 * To decode structured body for CRC64 content validtion in storage downloading.
 * @param source -
 */
export async function structuredMessageDecodingBrowser(
  source: Blob | ReadableStream<Uint8Array>,
): Promise<Blob> {
  /* eslint-disable no-unused-expressions */
  source;
  throw new Error("structuredMessageDecodingBrowser is only for Browser");
}

/**
 * Options used when creating StructuredMessageDecodingStream
 */
export interface StructuredMessageDecodingStreamOptions {
  /**
   * A threshold, not a limit. Dictates the amount of data that a stream buffers before it stops asking for more data.
   */
  highWaterMark?: number;
}

/**
 * To decode structured body for CRC64 content validtion in storage downloading.
 * @param source -
 * @param options -
 * @returns
 */
export function structuredMessageDecodingStream(
  source: NodeJS.ReadableStream,
  options: StructuredMessageDecodingStreamOptions,
): NodeJS.ReadableStream {
  return new StructuredMessageDecodingStream(source, options);
}

class StructuredMessageDecodingStream extends Readable {
  private source: NodeJS.ReadableStream;
  private decodingMethods: StructuredMessageDecoding;
  public constructor(
    source: NodeJS.ReadableStream,
    options: StructuredMessageDecodingStreamOptions,
  ) {
    super({ highWaterMark: options.highWaterMark });
    this.source = source;
    this.decodingMethods = new StructuredMessageDecoding((dataToHandle) => {
      if (!this.push(dataToHandle)) {
        source.pause();
      }
    });
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
    try{
      this.decodingMethods.sourceDataHandler(data);
    }
    catch (err){
      this.destroy(err as Error);
    }
  };

  private sourceAbortedHandler = () => {
    const abortError = new AbortError("The operation was aborted.");
    this.destroy(abortError);
  };

  private sourceErrorOrEndHandler = (err?: Error) => {
    if (err) {
      this.destroy(err);
      return;
    }

    this.removeSourceEventHandlers();
  };

  _destroy(error: Error | null, callback: (error?: Error) => void): void {
    // remove listener from source and release source
    this.removeSourceEventHandlers();
    (this.source as Readable).destroy();

    callback(error === null ? undefined : error);
  }
}
