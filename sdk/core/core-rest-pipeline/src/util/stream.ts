// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Readable } from "stream";
import { BlobLike } from "../interfaces";
import {
  isInMemoryBlob,
  isNodeReadableStream,
  isStreamableBlob,
  isWebReadableStream,
} from "./typeGuards";

function nodeStreamFromWebStream(webStream: ReadableStream): NodeJS.ReadableStream {
  return Readable.from(
    (async function* () {
      const reader = webStream.getReader();
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          return;
        }

        yield value;
      }
    })()
  );
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
