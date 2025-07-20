// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { isWebReadableStream } from "./typeGuardsCommon.js";
export * from "./typeGuardsCommon.js";

export function isBinaryBody(
  body: unknown,
): body is Uint8Array | ReadableStream<Uint8Array> | (() => ReadableStream<Uint8Array>) | Blob {
  return (
    body !== undefined &&
    (body instanceof Uint8Array ||
      isReadableStream(body) ||
      typeof body === "function" ||
      body instanceof Blob)
  );
}

export function isReadableStream(x: unknown): x is ReadableStream<Uint8Array> {
  return isWebReadableStream(x);
}
