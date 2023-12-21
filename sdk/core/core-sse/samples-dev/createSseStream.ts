// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary parses server-sent events.
 */
import { createSseStream } from "@azure/core-sse";

function* createChunkedEvent(str: string, chunkLen: number): Iterable<Uint8Array> {
  const encoder = new TextEncoder();
  yield encoder.encode("data: ");
  const bytes = encoder.encode(str);
  for (let i = 0; i < bytes.length; i += chunkLen) {
    const chunk = bytes.slice(i, i + chunkLen);
    yield chunk;
  }
  yield encoder.encode("\n\n");
}

function createStream(txt: string, chunkLen: number) {
  const stream = new ReadableStream({
    start(controller) {
      for (const chunk of createChunkedEvent(txt, chunkLen)) {
        controller.enqueue(chunk);
      }
      controller.close();
    },
  });
  return stream;
}

async function main() {
  const stream = createStream("hello world", 2);
  await using events = createSseStream(stream);
  for await (const event of events) {
    console.log(event.data);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
