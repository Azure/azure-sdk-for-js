// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Readable } from "node:stream";
import { ReadableStream as AsyncIterableReadableStream } from "node:stream/web";
import { isBlob, isNodeReadableStream, isWebReadableStream } from "./typeGuards.js";

async function* streamAsyncIterator(
  this: ReadableStream<Uint8Array>,
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

function makeAsyncIterable<T>(webStream: any): asserts webStream is AsyncIterableReadableStream<T> {
  if (!webStream[Symbol.asyncIterator]) {
    webStream[Symbol.asyncIterator] = streamAsyncIterator.bind(webStream);
  }

  if (!webStream.values) {
    webStream.values = streamAsyncIterator.bind(webStream);
  }
}

function nodeStreamFromWebStream(webStream: ReadableStream<Uint8Array>): NodeJS.ReadableStream {
  makeAsyncIterable<Uint8Array>(webStream);
  return Readable.fromWeb(webStream);
}

export function toWebStream(
  stream: ReadableStream<Uint8Array> | NodeJS.ReadableStream,
): ReadableStream<Uint8Array> {
  return isWebReadableStream(stream)
    ? stream
    : (Readable.toWeb(Readable.from(stream)) as ReadableStream<Uint8Array>);
}

export function toStream(
  source: ReadableStream<Uint8Array> | NodeJS.ReadableStream | Uint8Array | Blob,
): NodeJS.ReadableStream | ReadableStream<Uint8Array> {
  if (source instanceof Uint8Array) {
    return Readable.from(Buffer.from(source));
  } else if (isBlob(source)) {
    return nodeStreamFromWebStream(source.stream());
  } else if (isNodeReadableStream(source)) {
    return source;
  } else {
    return nodeStreamFromWebStream(source);
  }
}

export function concatenateStreams(
  sources: (ReadableStream<Uint8Array> | NodeJS.ReadableStream)[],
): ReadableStream<Uint8Array> | NodeJS.ReadableStream {
  if (sources.some(isWebReadableStream)) {
    throw new Error("Was not expecting a Web stream here");
  }

  return Readable.from(
    (async function* () {
      for (const stream of sources as NodeJS.ReadableStream[]) {
        for await (const chunk of stream) {
          yield chunk;
        }
      }
    })(),
  );
}
