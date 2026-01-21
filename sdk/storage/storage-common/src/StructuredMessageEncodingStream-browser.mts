import {
  RequestBodyType as HttpRequestBody,
} from "@azure/core-rest-pipeline";
import { StructuredMessageEncoding } from "./StructuredMessageEncoding.js";
import { isArrayBuffer } from "node:util/types";

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

async function BrowserStream(source: Blob | ReadableStream<Uint8Array>, content_length: number): Promise<{content: Blob, encodedContentLength: number}> {
  const sourceStream = (source instanceof Blob) ? source.stream() : source;
  const reader = sourceStream.getReader();

  let encodingStream : { stream: StructuredMessageEncoding,
    closed: boolean} | undefined = undefined;
  const stream = new ReadableStream({
    start(controller) { 
      encodingStream = { stream: new StructuredMessageEncoding((data) => {
        controller.enqueue(data)
      }, content_length),
      closed: false};
    },
    pull (controller) {
      pump(reader, controller, encodingStream!).then(() =>{});
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
    content_length: number,
  ): Promise<{ body: HttpRequestBody, encoded_content_length: number }> {
    if (source === null) {
      return {
        body: source,
        encoded_content_length: content_length,
      }
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
        encoded_content_length: encoding.encodedContentLength
      }
    }

    if (((typeof source) === 'string')
      || (source instanceof ArrayBuffer)) {
        
      const encoding = await BrowserStream(new Blob([source]), content_length);

      return {
        body: encoding.content,
        encoded_content_length: encoding.encodedContentLength
      }
    }

    if (ArrayBuffer.isView(source)) {
      let encoding = undefined;
      if (isArrayBuffer(source.buffer)) {
        encoding = await BrowserStream(new Blob([source.buffer.slice(source.byteOffset, source.byteOffset + source.byteLength)]), content_length);       

        return {
          body: encoding.content,
          encoded_content_length: encoding.encodedContentLength
        }
      }
    }

    // if (source instanceof ArrayBuffer){
    //   const stream = Readable.from(Buffer.from(source));
    //   return {
    //     body: await new StructuredMessageEncodingStream(stream, content_length, {}),
    //     encoded_content_length: content_length + MESSAGE_HEADER_LENGTH + SEGMENT_HEADER_LENGTH + FOOTER_LENGTH * 2
    //    }
    // }

    // if (ArrayBuffer.isView(source)){
    //   const stream = Readable.from(Buffer.from(source.buffer, source.byteOffset, source.byteLength));
    //   return {
    //     body: await new StructuredMessageEncodingStream(stream, content_length, {}),
    //     encoded_content_length: content_length + MESSAGE_HEADER_LENGTH + SEGMENT_HEADER_LENGTH + FOOTER_LENGTH * 2
    //    }
    // }

    return {
      body: source,
      encoded_content_length: content_length
    };
  }