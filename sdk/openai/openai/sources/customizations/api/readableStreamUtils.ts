// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export function polyfillStream<T>(
  stream: ReadableStream<T>,
  dispose: () => PromiseLike<void>
): ReadableStream<T> & AsyncIterable<T> & AsyncDisposable {
  makeAsyncIterable<T>(stream);
  makeAsyncDisposable(stream, dispose);
  return stream;
}

function makeAsyncDisposable<T>(
  webStream: any,
  dispose: () => PromiseLike<void>
): asserts webStream is ReadableStream<T> & AsyncDisposable {
  if (!webStream[Symbol.asyncDispose]) {
    webStream[Symbol.asyncDispose] = dispose.bind(webStream);
  }
}

function makeAsyncIterable<T>(
  webStream: any
): asserts webStream is ReadableStream<T> & AsyncIterable<T> {
  if (!webStream[Symbol.asyncIterator]) {
    webStream[Symbol.asyncIterator] = toAsyncIterable.bind(webStream);
  }

  if (!webStream.values) {
    webStream.values = toAsyncIterable.bind(webStream);
  }
}

export async function* toAsyncIterable<T>(stream: ReadableStream<T>): AsyncIterableIterator<T> {
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
