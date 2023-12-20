// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export function createStream<T>(
  asyncIter: AsyncIterableIterator<T>,
  dispose: () => PromiseLike<void>,
): ReadableStream<T> & AsyncDisposable & AsyncIterable<T> {
  const stream = iteratorToStream(asyncIter, dispose);
  /** TODO: remove these polyfills once all supported runtimes support them */
  return polyfillStream(stream, dispose);
}

function polyfillStream<T>(
  stream: ReadableStream<T>,
  dispose: () => PromiseLike<void>,
): ReadableStream<T> & AsyncIterable<T> & AsyncDisposable {
  makeAsyncIterable<T>(stream);
  makeAsyncDisposable(stream, dispose);
  return stream;
}

function makeAsyncDisposable<T>(
  webStream: any,
  dispose: () => PromiseLike<void>,
): asserts webStream is ReadableStream<T> & AsyncDisposable {
  if (!webStream[Symbol.asyncDispose]) {
    webStream[Symbol.asyncDispose] = () => dispose();
  }
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

function iteratorToStream<T>(
  iterator: AsyncIterableIterator<T>,
  cancel: () => PromiseLike<void>,
): ReadableStream<T> {
  return new ReadableStream({
    async pull(controller) {
      const { value, done } = await iterator.next();
      if (done) {
        controller.close();
      } else {
        controller.enqueue(value);
      }
    },
    cancel,
  });
}

export function ensureAsyncIterable(
  chunkIter: NodeJS.ReadableStream | ReadableStream<Uint8Array>,
): {
  dispose(): Promise<void>;
  iterable: AsyncIterable<Uint8Array>;
} {
  if (isReadableStream(chunkIter)) {
    return {
      dispose: async () => {
        /** nothing needs to be cleaned up */
      },
      iterable: toAsyncIterable(chunkIter),
    };
  } else {
    return {
      dispose: async () => {
        // drain the stream
        chunkIter.resume();
      },
      iterable: chunkIter as AsyncIterable<Uint8Array>,
    };
  }
}

function isReadableStream(body: unknown): body is ReadableStream {
  return Boolean(
    body &&
      typeof (body as ReadableStream).getReader === "function" &&
      typeof (body as ReadableStream).tee === "function",
  );
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
    reader.releaseLock();
  }
}
