// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Readable } from "stream";
import { ReadableStream as AsyncIterableReadableStream } from "stream/web";
import { BlobLike } from "../interfaces";
import {
  isInMemoryBlob,
  isNodeReadableStream,
  isStreamableBlob,
  isWebReadableStream,
} from "./typeGuards";

function assertAsyncIterable(webStream: any): asserts webStream is AsyncIterableReadableStream {
  if (!(webStream as any)[Symbol.asyncIterator]) {
    throw new Error("Expected ReadableStream in Node to have @@asyncIterator");
  }
}

function nodeStreamFromWebStream(webStream: ReadableStream<Uint8Array>): NodeJS.ReadableStream {
  assertAsyncIterable(webStream);
  return Readable.fromWeb(webStream);
}

export function toStream(
  source: ReadableStream | NodeJS.ReadableStream | Uint8Array | BlobLike
): NodeJS.ReadableStream | ReadableStream {
  if (source instanceof Uint8Array) {
    return Readable.from(Buffer.from(source));
  } else if (isInMemoryBlob(source)) {
    return Readable.from(Buffer.from(source.content));
  } else if (isStreamableBlob(source)) {
    const stream = typeof source.stream === "function" ? source.stream() : source.stream;
    return isNodeReadableStream(stream) ? stream : nodeStreamFromWebStream(stream);
  } else if (isNodeReadableStream(source)) {
    return source;
  } else {
    return nodeStreamFromWebStream(source);
  }
}

export function concatenateStreams(
  sources: (ReadableStream | NodeJS.ReadableStream)[]
): ReadableStream | NodeJS.ReadableStream {
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
    })()
  );
}
