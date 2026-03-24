// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  RequestBodyType as HttpRequestBody,
} from "@azure/core-rest-pipeline";
import { StructuredMessageEncoding } from "./StructuredMessageEncoding.js";

async function pump(
  reader: ReadableStreamDefaultReader, 
  controller: ReadableStreamDefaultController,
  encodingStream: { stream: StructuredMessageEncoding,
    closed: boolean}) : Promise<void> {
  const { done, value } = await reader.read();

  if (value) {  
    // Enqueue the next data chunk into our target stream
    encodingStream.stream.sourceDataHandler(value);
  }
  // When no more data needs to be consumed, close the stream
  if (done) {
    if (!encodingStream.closed) {
        encodingStream.closed = true;
        controller.close();
    }
    return;
  }
}

async function BrowserStream(source: Blob | ReadableStream<Uint8Array>, contentLength: number): Promise<{content: Blob, encodedContentLength: number}> {
  const sourceStream = (source instanceof Blob) ? source.stream() : source;
  const reader = sourceStream.getReader();

  let encodingStream : { stream: StructuredMessageEncoding,
    closed: boolean} | undefined = undefined;
  const stream = new ReadableStream({
    start(controller) { 
      encodingStream = { stream: new StructuredMessageEncoding((data) => {
        controller.enqueue(data)
      }, contentLength),
      closed: false};
    },
    pull (controller) {
      pump(reader, controller, encodingStream!).then(() =>{
        return;
      })
      .catch((err) =>{
        controller.error(err);
      });
    }
  });

  const response = new Response(stream);
  return {
    content: await response.blob(),
    encodedContentLength: encodingStream!.stream.messageLength,
  }
}

export async function structuredMessageEncoding(
    source: HttpRequestBody,
    contentLength: number,
  ): Promise<{ body: HttpRequestBody, encodedContentLength: number }> {
    if (source === null) {
      return {
        body: source,
        encodedContentLength: contentLength,
      }
    }

    if (source instanceof Blob) {
      const encoding = await BrowserStream(source, contentLength);
      return {
        body: encoding.content,
        encodedContentLength: encoding.encodedContentLength
      }
    }

    if (((typeof source) === 'string')
      || (source instanceof ArrayBuffer)) {
        
      const encoding = await BrowserStream(new Blob([source]), contentLength);

      return {
        body: encoding.content,
        encodedContentLength: encoding.encodedContentLength
      }
    }

    if (ArrayBuffer.isView(source)) {
      let encoding = undefined;
      if (source.buffer instanceof ArrayBuffer) {
        encoding = await BrowserStream(new Blob([source.buffer.slice(source.byteOffset, source.byteOffset + source.byteLength)]), contentLength);       

        return {
          body: encoding.content,
          encodedContentLength: encoding.encodedContentLength
        }
      }
    }

    throw new Error("The specified request body type is not supported for CRC64 checksum");
  }
