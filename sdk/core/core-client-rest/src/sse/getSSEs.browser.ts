// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { EventMessage, HttpResponse } from "../common";
import { toSSE } from "./sse";

export async function getSSEs(response: HttpResponse): Promise<AsyncIterable<EventMessage>> {
  const iter = await getStream(response);
  return toSSE(iter);
}

async function* toAsyncIterable<T>(stream: ReadableStream<T>): AsyncIterable<T> {
  const reader = stream.getReader();
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) {
        return;
      }
      yield value;
    }
  } finally {
    reader.releaseLock();
  }
}

async function getStream(response: HttpResponse): Promise<AsyncIterable<Uint8Array>> {
  const stream = response.body;
  if (!stream) throw new Error("No stream found in response");
  return toAsyncIterable(stream as ReadableStream<Uint8Array>);
}
