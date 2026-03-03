// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AbortError } from "@azure/abort-controller";
import { RequestBodyType as HttpRequestBody } from "@azure/core-rest-pipeline";
import Stream, { Readable } from "node:stream";
import { StructuredMessageEncoding } from "./StructuredMessageEncoding.js";

export function isNodeReadableStream(source: unknown): boolean {
  return (
    source !== null &&
    source instanceof Stream &&
    typeof (source as any)._read === "function" &&
    typeof (source as any)._readableState === "object" &&
    typeof source.pipe === "function"
  );
}

/**
 * Options used when creating StructuredMessageEncodingStream
 */
export interface StructuredMessageEncodingStreamOptions {
  /**
   * A threshold, not a limit. Dictates the amount of data that a stream buffers before it stops asking for more data.
   */
  highWaterMark?: number;
}

/**
 *
 * To encode structured body for CRC64 content validtion in storage uploading.
 * @param source -
 * @param content_length -
 * @returns
 */
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

  throw new Error("The specified request body type is not supported for CRC64 checksum");
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
      pump(reader, controller, encodingStream!)
        .then(() => {
          return;
        })
        .catch(function (error) {
          throw error;
        });
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
  private encodingMethods: StructuredMessageEncoding;

  public constructor(
    source: NodeJS.ReadableStream,
    contentLength: number,
    options: StructuredMessageEncodingStreamOptions,
  ) {
    super({ highWaterMark: options.highWaterMark });
    this.source = source;
    this.encodingMethods = new StructuredMessageEncoding((dataToHandle) => {
      if (!this.push(dataToHandle)) {
        source.pause();
      }
    }, contentLength);
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
  }

  _destroy(error: Error | null, callback: (error?: Error) => void): void {
    // remove listener from source and release source
    this.removeSourceEventHandlers();
    (this.source as Readable).destroy();

    callback(error === null ? undefined : error);
  }
}
