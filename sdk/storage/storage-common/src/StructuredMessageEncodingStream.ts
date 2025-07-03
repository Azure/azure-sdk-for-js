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

import { AbortError } from "@azure/abort-controller";
import { RequestBodyType as HttpRequestBody } from "@azure/core-rest-pipeline";
import Stream, { Readable } from "node:stream";
import { StructuredMessageEncoding } from "./StructuredMessageEncoding.js";

export function isNodeReadableStream(source: any): boolean {
  return (
    source !== null &&
    source instanceof Stream &&
    typeof (source as any)._read == "function" &&
    typeof (source as any)._readableState == "object" &&
    typeof source.pipe === "function"
  );
}

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

export async function structuredMessageEncoding(
  source: HttpRequestBody,
  content_length: number,
): Promise<{ body: HttpRequestBody; encoded_content_length: number }> {
  if (source === null) {
    return {
      body: source,
      encoded_content_length: content_length,
    };
  }

  if (isNodeReadableStream(source)) {
    const encodingMessage = new StructuredMessageEncodingStream(source as any, content_length, {});
    return {
      body: encodingMessage,
      encoded_content_length: encodingMessage.messageLength(),
    };
  }

  if (typeof source === "function") {
    const encodingMessage = new StructuredMessageEncodingStream(
      source() as NodeJS.ReadableStream,
      content_length,
      {},
    );
    return {
      body: encodingMessage,
      encoded_content_length: encodingMessage.messageLength(),
    };
  }

  // if (source instanceof FormData) {
  //   const blob = await (new Response(source).blob());
  //   const encoding = await BrowserStream(blob, blob.size);
  //   return {
  //     body: encoding.content,
  //     encoded_content_length: encoding.encodedContentLength
  //   }
  // }

  if (source instanceof Blob) {
    const encoding = await BrowserStream(source, content_length);
    return {
      body: encoding.content,
      encoded_content_length: encoding.encodedContentLength,
    };
  }

  if (typeof source === "string") {
    const s = new Readable();
    s._read = () => {};
    s.push(source);
    s.push(null);
    const string_content_length = Buffer.byteLength(source as string);
    const encodingMessage = await new StructuredMessageEncodingStream(s, string_content_length, {});
    return {
      body: encodingMessage,
      encoded_content_length: encodingMessage.messageLength(),
    };
  }

  if (source instanceof ArrayBuffer) {
    const stream = Readable.from(Buffer.from(source));
    const encodingMessage = await new StructuredMessageEncodingStream(stream, content_length, {});
    return {
      body: encodingMessage,
      encoded_content_length: encodingMessage.messageLength(),
    };
  }

  if (source instanceof Buffer) {
    const stream = Readable.from(source);
    const encodingMessage = await new StructuredMessageEncodingStream(stream, content_length, {});
    return {
      body: encodingMessage,
      encoded_content_length: encodingMessage.messageLength(),
    };
  }

  if (ArrayBuffer.isView(source)) {
    const stream = Readable.from(Buffer.from(source.buffer, source.byteOffset, source.byteLength));
    const encodingMessage = await new StructuredMessageEncodingStream(stream, content_length, {});
    return {
      body: encodingMessage,
      encoded_content_length: encodingMessage.messageLength(),
    };
  }

  return {
    body: source,
    encoded_content_length: content_length,
  };
}

async function pump(
  reader: ReadableStreamDefaultReader,
  controller: ReadableStreamDefaultController,
  encodingStream: StructuredMessageEncoding,
): Promise<void> {
  const { done, value } = await reader.read();

  // When no more data needs to be consumed, close the stream
  if (done) {
    controller.close();
    return;
  }

  // Enqueue the next data chunk into our target stream
  encodingStream.sourceDataHandler(Buffer.from(value));
}

async function BrowserStream(
  source: Blob | ReadableStream<Uint8Array>,
  content_length: number,
): Promise<{ content: Blob; encodedContentLength: number }> {
  const sourceStream = source instanceof Blob ? source.stream() : source;
  const reader = sourceStream.getReader();

  let encodingStream: StructuredMessageEncoding | undefined = undefined;
  const stream = new ReadableStream({
    start(controller) {
      encodingStream = new StructuredMessageEncoding((data) => {
        controller.enqueue(data);
      }, content_length);
    },
    pull(controller) {
      pump(reader, controller, encodingStream!).then(() => {});
    },
  });

  const response = new Response(stream);
  return {
    content: await response.blob(),
    encodedContentLength: encodingStream!.messageLength,
  };
}

class StructuredMessageEncodingStream extends Readable {
  private source: NodeJS.ReadableStream;
  private options: StructuredMessageEncodingStreamOptions;
  private encodingMethods: StructuredMessageEncoding;

  public constructor(
    source: NodeJS.ReadableStream,
    contentLength: number,
    options: StructuredMessageEncodingStreamOptions,
  ) {
    super({ highWaterMark: options.highWaterMark });
    this.options = options;
    this.source = source;
    this.encodingMethods = new StructuredMessageEncoding((dataToHandle) => {
      if (!this.push(dataToHandle)) {
        source.pause();
      }
    }, contentLength);
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

  public messageLength(): number {
    return this.encodingMethods.messageLength;
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
    this.encodingMethods.sourceDataHandler(data);
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
    this.source.resume();
    this.options;
  }

  _destroy(error: Error | null, callback: (error?: Error) => void): void {
    // remove listener from source and release source
    //this.removeSourceEventHandlers();
    //(this.source as Readable).destroy();

    callback(error === null ? undefined : error);
  }
}
