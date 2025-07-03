import { StructuredMessageDecoding } from "./StructedMessageDecoding.js";

export const structuredMessageDecodingStream = 1;

async function pump(
  reader: ReadableStreamDefaultReader, 
  messageDecoding: StructuredMessageDecoding) : Promise<void> {
  const { done, value } = await reader.read();
  // When no more data needs to be consumed, close the stream
  if (done) {
    return;
  }
    
  // Enqueue the next data chunk into our target stream
  messageDecoding.sourceDataHandler(value);
}

export async function structuredMessageDecodingBrowser(source: Blob | ReadableStream<Uint8Array>): Promise<Blob> {
  const sourceStream = (source instanceof Blob) ? source.stream() : source;
  const reader = sourceStream.getReader();
  let messageDecoding : StructuredMessageDecoding | undefined = undefined;
  const stream = new ReadableStream({
    start(controller) {
      messageDecoding = new StructuredMessageDecoding((data) => {
        if (null !== data) 
          {
            controller.enqueue(data)
          }
        else {
          controller.close();
        }});
    },
    pull (controller) {
      pump(reader, messageDecoding!)
        .then(() =>{})
        .catch((err) => {
          controller.error(err)});
    }
  });
  const response = new Response(stream);
  return response.blob();
}