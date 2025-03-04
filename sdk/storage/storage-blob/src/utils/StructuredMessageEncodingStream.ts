/// <summary>
/// Decodes a structured message stream as the data is read.
/// </summary>
/// <remarks>
/// Wraps the inner stream in a <see cref="BufferedStream"/>, which avoids using its internal
/// buffer if individual Read() calls are larger than it. This ensures one of the three scenarios
/// <list type="number">
/// <item>
/// Read buffer &gt;= stream buffer:
/// There is enough space in the read buffer for inline metadata to be safely
/// extracted in only one read to the true inner stream.
/// </item>
/// <item>
/// Read buffer &lt; next inline metadata:
/// The stream buffer has been activated, and we can read multiple small times from the inner stream
/// without multi-reading the real stream, even when partway through an existing stream buffer.
/// </item>
/// <item>
/// Else:
/// Same as #1, but also the already-allocated stream buffer has been used to slightly improve
/// resource churn when reading inner stream.
/// </item>
/// </list>
/// </remarks>

import { Readable, Stream } from "stream";
import { AbortError } from "@azure/abort-controller";
import { HttpRequestBody } from "../Pipeline";

// const MESSAGE_VERSION: number = 1;
// const MESSAGE_HEADER_LENGTH: number = 13;
// const SEGMENT_HEADER_LENGTH: number = 10;
// const FOOTER_LENGTH: number = 8;

export interface StructuredMessageEncodingStreamOptions {
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
  doInjectErrorOnce?: boolean;

  /**
   * A threshold, not a limit. Dictates the amount of data that a stream buffers before it stops asking for more data.
   */
  highWaterMark?: number;
}

export async function BrowserStream(blob: Blob): Promise<Blob> {
  const reader = blob.stream().getReader();
  const stream = new ReadableStream({
  start(controller) {
    return pump();
    function pump(): any {
      return reader.read().then(({ done, value }) => {
        // When no more data needs to be consumed, close the stream
        if (done) {
          controller.close();
          return;
        }
        // Enqueue the next data chunk into our target stream
        controller.enqueue(value);
        return pump();
      });
    }
  },
});
  const response = new Response(stream);
  return response.blob();
}

export class StructuredMessageEncodingStream extends Readable {
  private source: NodeJS.ReadableStream
  private options: StructuredMessageEncodingStreamOptions;

  public static async init(
    source: HttpRequestBody,
    content_length: number,
  ): Promise<{ body: HttpRequestBody, encoded_content_length: number }> {
    if (source === null) {
      return {
        body: source,
        encoded_content_length: content_length,
      }
    }
    
    if (this.isReadableStream(source)) {
      return {
      body: new StructuredMessageEncodingStream((source as any), {}),
      encoded_content_length: content_length,
    }};

    if (typeof (source) === 'function') {
        return {
        body: new StructuredMessageEncodingStream((source() as any), {}),
        encoded_content_length: content_length,
      }
    }

    if (source instanceof Blob) {
      return {
        body: await BrowserStream(source),
        encoded_content_length: content_length
      }
    }

    return {
      body: source,
      encoded_content_length: content_length
    };
  }

  private static isReadableStream(source: HttpRequestBody) : boolean {
      return source !== null && source instanceof Stream && typeof (source as any)._read == 'function' && typeof (source as any)._readableState == 'object'
  }

  public constructor(
    source: NodeJS.ReadableStream,
    options: StructuredMessageEncodingStreamOptions,
  ) {
    super({ highWaterMark: options.highWaterMark });
    this.options = options;
    this.source = source;
    // if (objectType !== "string" &&
    //     typeof value.pipe !== "function" && // NodeJS.ReadableStream
    //     typeof value.tee !== "function" && // browser ReadableStream
    //     !(value instanceof ArrayBuffer) &&
    //     !ArrayBuffer.isView(value) &&
    //     // File objects count as a type of Blob, so we want to use instanceof explicitly
    //     !((typeof Blob === "function" || typeof Blob === "object") && value instanceof Blob) &&
    //     objectType !== "function") {
    this.setSourceEventHandlers();
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
    this.push(data);
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

  public _read(): void {
    this.source;
    this.options;
  }

  _destroy(error: Error | null, callback: (error?: Error) => void): void {
    // remove listener from source and release source
    //this.removeSourceEventHandlers();
    //(this.source as Readable).destroy();

    callback(error === null ? undefined : error);
  }
}
