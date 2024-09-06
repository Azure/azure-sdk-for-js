// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Readable } from "stream";
import type { ReadableStream as AsyncIterableReadableStream } from "stream/web";
import { isBlob } from "./typeGuards.js";
import { getRawContent } from "./file.js";

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

function ensureNodeStream(
  stream: ReadableStream<Uint8Array> | NodeJS.ReadableStream,
): NodeJS.ReadableStream {
  if (stream instanceof ReadableStream) {
    makeAsyncIterable<Uint8Array>(stream);
    return Readable.fromWeb(stream);
  } else {
    return stream;
  }
}

function toStream(
  source: ReadableStream<Uint8Array> | NodeJS.ReadableStream | Uint8Array | Blob,
): NodeJS.ReadableStream {
  if (source instanceof Uint8Array) {
    return Readable.from(Buffer.from(source));
  } else if (isBlob(source)) {
    return toStream(getRawContent(source));
  } else {
    return ensureNodeStream(source);
  }
}

/**
 * Accepted binary data types for concat
 *
 * @internal
 */
export type ConcatSource = ReadableStream<Uint8Array> | NodeJS.ReadableStream | Uint8Array | Blob;

/**
 * Utility function that concatenates a set of binary inputs into one combined output.
 *
 * @param sources - array of sources for the concatenation
 * @returns - in Node, a (() =\> NodeJS.ReadableStream) which, when read, produces a concatenation of all the inputs.
 *           In browser, returns a `Blob` representing all the concatenated inputs.
 *
 * @internal
 */
export async function concat(
  sources: (ConcatSource | (() => ConcatSource))[],
): Promise<(() => NodeJS.ReadableStream) | Blob> {
  return function () {
    const streams = sources.map((x) => (typeof x === "function" ? x() : x)).map(toStream);

    return Readable.from(
      (async function* () {
        for (const stream of streams as NodeJS.ReadableStream[]) {
          for await (const chunk of stream) {
            yield chunk;
          }
        }
      })(),
    );
  };
}
