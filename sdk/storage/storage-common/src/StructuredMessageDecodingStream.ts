import { AbortError } from "@azure/abort-controller";
import { Readable } from "node:stream";
import { StructuredMessageDecoding } from "./StructedMessageDecoding.js";

export async function structuredMessageDecodingBrowser(
  source: Blob | ReadableStream<Uint8Array>,
): Promise<Blob> {
  source;
  throw new Error("structuredMessageDecodingBrowser is only for Browser");
}

export interface StructuredMessageDecodingStreamOptions {
  /**
   * Read progress event handler
   */
  // TODO: onProgress?: (progress: TransferProgressEvent) => void;

  /**
   * Debug purpose only. Used to inject an unexpected end to existing internal stream,
   * to test stream retry works well or not.
   *
   * When assign it to true, for next incoming "data" event of internal stream,
   * RetriableReadableStream will try to emit an "end" event to existing internal
   * stream to force it end and start retry from the breaking point.
   * The value will then update to "undefined", once the injection works.
   */
  // doInjectErrorOnce?: boolean;

  /**
   * A threshold, not a limit. Dictates the amount of data that a stream buffers before it stops asking for more data.
   */
  highWaterMark?: number;
}

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
    this.decodingMethods.sourceDataHandler(data);
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
  };

  _destroy(error: Error | null, callback: (error?: Error) => void): void {
    // remove listener from source and release source
    this.removeSourceEventHandlers();
    (this.source as Readable).destroy();

    callback(error === null ? undefined : error);
  }
}
