// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { isWebReadableStream } from "./typeGuardsCommon.js";
import type { NodeReadableStream } from "#platform/nodeTypes";
export * from "./typeGuardsCommon.js";

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

export function isReadableStream(x: unknown): x is ReadableStream<Uint8Array> | NodeReadableStream {
  return isWebReadableStream(x);
}
