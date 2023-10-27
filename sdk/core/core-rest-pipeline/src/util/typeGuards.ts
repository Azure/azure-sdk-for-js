// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { BlobLike, FileLike, InMemoryBlob, StreamableBlob } from "../interfaces";

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

export function isInMemoryBlob(x: unknown): x is InMemoryBlob {
  return Boolean(x && (x as InMemoryBlob).content instanceof Uint8Array);
}

export function isStreamableBlob(x: unknown): x is StreamableBlob {
  return Boolean(
    x &&
      (typeof (x as StreamableBlob).stream === "function" ||
        isReadableStream((x as StreamableBlob).stream))
  );
}

export function isBlobLike(x: unknown): x is BlobLike {
  return isInMemoryBlob(x) || isStreamableBlob(x);
}

export function isFileLike(x: unknown): x is FileLike {
  return isBlobLike(x);
}
