// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NodeReadableStream } from "#platform/nodeTypes";

export function isNodeReadableStream(x: unknown): x is NodeReadableStream {
  return Boolean(x && typeof (x as NodeReadableStream)["pipe"] === "function");
}

export function isWebReadableStream(x: unknown): x is ReadableStream {
  return Boolean(
    x &&
    typeof (x as ReadableStream).getReader === "function" &&
    typeof (x as ReadableStream).tee === "function",
  );
}

export function isBinaryBody(
  body: unknown,
): body is
  | Uint8Array
  | NodeReadableStream
  | ReadableStream<Uint8Array>
  | (() => NodeReadableStream)
  | (() => ReadableStream<Uint8Array>)
  | Blob {
  return (
    body !== undefined &&
    (body instanceof Uint8Array ||
      isReadableStream(body) ||
      typeof body === "function" ||
      body instanceof Blob)
  );
}

export function isReadableStream(x: unknown): x is ReadableStream | NodeReadableStream {
  return isNodeReadableStream(x) || isWebReadableStream(x);
}

export function isBlob(x: unknown): x is Blob {
  return typeof (x as Blob).stream === "function";
}
