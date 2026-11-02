// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { finished, Readable } from "stream";
import type { ReadableStream as AsyncIterableReadableStream } from "stream/web";
import { isBlob, isNodeReadableStream } from "./typeGuards.js";
import { disposeNodeStream, setResponseBodySources } from "./responseBody.js";

const concatSources = new WeakMap<object, readonly NodeJS.ReadableStream[]>();

/**
 * Returns existing Node sources without invoking a concatenated body's factory.
 *
 * @internal
 */
export function getConcatSources(body: () => unknown): readonly NodeJS.ReadableStream[] {
  return concatSources.get(body) ?? [];
}

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
    return ensureNodeStream(source.stream());
  } else {
    return ensureNodeStream(source);
  }
}

/**
 * Accepted binary data types for concat
 *
 * @internal
 */
export type ConcatSource =
  ReadableStream<Uint8Array<ArrayBuffer>> | NodeJS.ReadableStream | Uint8Array<ArrayBuffer> | Blob;

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
  const createBody = (): NodeJS.ReadableStream => {
    const streams = sources.map((x) => (typeof x === "function" ? x() : x)).map(toStream);

    const body = Readable.from(readParts());
    async function* readParts(): AsyncIterableIterator<unknown> {
      for (const stream of streams) {
        if (body.destroyed) {
          return;
        }
        for await (const chunk of stream) {
          yield chunk;
        }
      }
    }
    setResponseBodySources(body, streams);
    for (const stream of streams) {
      // Later parts can fail before the iterator reaches them.
      const cleanup = finished(stream, { writable: false }, (error) => {
        cleanup();
        if (error && !body.destroyed) {
          body.destroy(error);
          disposeNodeStream(body);
        }
      });
    }
    return body;
  };
  concatSources.set(createBody, sources.filter(isNodeReadableStream));
  return createBody;
}
