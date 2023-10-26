// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Readable } from "stream";
import { BlobLike, FileLike } from "../interfaces";

export function isNodeReadableStream(x: unknown): x is NodeJS.ReadableStream {
  return Boolean(x && typeof (x as NodeJS.ReadableStream)["pipe"] === "function");
}

export function isWebReadableStream(x: unknown): x is ReadableStream {
  return Boolean(
    x &&
      typeof (x as ReadableStream).getReader === "function" &&
      typeof (x as ReadableStream).tee === "function"
  );
}

function nodeStreamFromWebStream(webStream: ReadableStream): NodeJS.ReadableStream {
  //grumble
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

export function isReadableStream(x: unknown): x is ReadableStream | NodeJS.ReadableStream {
  return isNodeReadableStream(x) || isWebReadableStream(x);
}

export function isBlobLike(x: unknown): x is BlobLike {
  return Boolean(
    x && (typeof (x as BlobLike).stream === "function" || isReadableStream((x as BlobLike).stream))
  );
}

export function isFileLike(x: unknown): x is FileLike {
  return isBlobLike(x);
}

export function toStream(
  source: ReadableStream | NodeJS.ReadableStream | Uint8Array | BlobLike
): NodeJS.ReadableStream | ReadableStream {
  if (source instanceof Uint8Array) {
    return Readable.from(Buffer.from(source));
  } else if (isBlobLike(source)) {
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
    throw new Error("Browser ReadableStream not currently supported in Node environment");
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
