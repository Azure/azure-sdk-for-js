// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ReadableStream as AsyncIterableReadableStream } from "stream/web";

async function* streamAsyncIterator(
  this: ReadableStream<Uint8Array>
): AsyncIterableIterator<Uint8Array> {
  const reader = this.getReader();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        return;
      }

      yield value;
    }
  } finally {
    reader.releaseLock();
  }
}

export function makeAsyncIterable<T>(
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  webStream: any
): asserts webStream is AsyncIterableReadableStream<T> {
  if (!webStream[Symbol.asyncIterator]) {
    webStream[Symbol.asyncIterator] = streamAsyncIterator.bind(webStream);
  }

  if (!webStream.values) {
    webStream.values = streamAsyncIterator.bind(webStream);
  }
}
