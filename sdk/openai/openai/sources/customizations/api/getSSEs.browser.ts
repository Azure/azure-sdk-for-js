// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { StreamableMethod } from "@azure-rest/core-client";
import { EventMessage, onSSE } from "./sse.js";

async function* toAsyncIterable<T>(stream: ReadableStream<T>): AsyncIterable<T> {
  const reader = stream.getReader();
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) {
        break;
      }
      yield value;
    }
  } finally {
    reader.releaseLock();
  }
}

async function getStream<TResponse>(
  response: StreamableMethod<TResponse>
): Promise<AsyncIterable<Uint8Array>> {
  const stream = (await response.asBrowserStream()).body;
  if (!stream) throw new Error("No stream found in response. Did you enable the stream option?");
  return toAsyncIterable(stream);
}

export async function getSSEs(
  response: StreamableMethod<unknown>,
  options: { onError?: (reason: any) => void } = {}
): Promise<AsyncIterable<EventMessage>> {
  const iter = await getStream(response);
  return toAsyncIterable(
    new ReadableStream({
      start(controller) {
        function onMessage(msg: EventMessage): void {
          controller.enqueue(msg);
        }
        return onSSE(iter, onMessage)
          .catch(options.onError)
          .finally(() => controller.close());
      },
    })
  );
}
