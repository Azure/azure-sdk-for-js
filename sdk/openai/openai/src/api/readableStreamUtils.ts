// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export function polyfillStream<T>(stream: ReadableStream<T>): ReadableStream<T> & AsyncIterable<T> {
  makeAsyncIterable<T>(stream);
  return stream;
}

function makeAsyncIterable<T>(
  webStream: any,
): asserts webStream is ReadableStream<T> & AsyncIterable<T> {
  if (!webStream[Symbol.asyncIterator]) {
    webStream[Symbol.asyncIterator] = () => toAsyncIterable(webStream);
  }

  if (!webStream.values) {
    webStream.values = () => toAsyncIterable(webStream);
  }
}

async function* toAsyncIterable<T>(stream: ReadableStream<T>): AsyncIterableIterator<T> {
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
    const cancelPromise = reader.cancel();
    reader.releaseLock();
    await cancelPromise;
  }
}

export async function streamToText(stream: ReadableStream<Uint8Array>): Promise<string> {
  const reader = stream.getReader();
  const buffers: Uint8Array[] = [];
  let length = 0;
  try {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const { value, done } = await reader.read();
      if (done) {
        return new TextDecoder().decode(concatBuffers(buffers, length));
      }
      length += value.length;
      buffers.push(value);
    }
  } finally {
    reader.releaseLock();
  }
}

function getBuffersLength(buffers: Uint8Array[]): number {
  return buffers.reduce((acc, curr) => acc + curr.length, 0);
}

function concatBuffers(buffers: Uint8Array[], len?: number): Uint8Array {
  const length = len ?? getBuffersLength(buffers);
  const res = new Uint8Array(length);
  for (let i = 0, pos = 0; i < buffers.length; i++) {
    const buffer = buffers[i];
    res.set(buffer, pos);
    pos += buffer.length;
  }

  return res;
}
