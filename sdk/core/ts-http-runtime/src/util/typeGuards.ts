// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NodeReadableStream, WebReadableStream } from "#platform/types";
import { isNodeReadableStream, isWebReadableStream } from "#platform/typeGuards";

export { isNodeReadableStream, isWebReadableStream };

export function isBinaryBody(
  body: unknown,
): body is
  | Uint8Array
  | NodeReadableStream
  | WebReadableStream<Uint8Array>
  | (() => NodeReadableStream)
  | (() => WebReadableStream<Uint8Array>)
  | Blob {
  return (
    body !== undefined &&
    (body instanceof Uint8Array ||
      isReadableStream(body) ||
      typeof body === "function" ||
      body instanceof Blob)
  );
}

export function isReadableStream(x: unknown): x is WebReadableStream | NodeReadableStream {
  return isNodeReadableStream(x) || isWebReadableStream(x);
}

export function isBlob(x: unknown): x is Blob {
  return x instanceof Blob;
}
