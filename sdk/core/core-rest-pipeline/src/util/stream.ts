// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Readable } from "stream";

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

export function isReadableStream(x: unknown): x is ReadableStream | NodeJS.ReadableStream {
  return isNodeReadableStream(x) || isWebReadableStream(x);
}

export function toStream(
  source: ReadableStream | NodeJS.ReadableStream | Uint8Array | Blob
): NodeJS.ReadableStream | ReadableStream {
  if (source instanceof Uint8Array) {
    return Readable.from(Buffer.from(source));
  } else if (isNodeReadableStream(source)) {
    return source;
  } else {
    // FIXME: can update to support browser ReadableStream with Node >18 (for Readable.fromWeb; needs update to NodeHttpClient)
    throw new Error("Blob and browser ReadableStream not currently supported in Node environment");
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
