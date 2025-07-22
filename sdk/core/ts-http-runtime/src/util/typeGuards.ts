// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Blob } from "node:buffer";
import { isWebReadableStream } from "./typeGuardsCommon.js";
export * from "./typeGuardsCommon.js";

export function isNodeReadableStream(x: unknown): x is NodeJS.ReadableStream {
  return Boolean(x && typeof (x as NodeJS.ReadableStream)["pipe"] === "function");
}

export function isBinaryBody(
  body: unknown,
): body is
  | Uint8Array
  | NodeJS.ReadableStream
  | ReadableStream<Uint8Array>
  | (() => NodeJS.ReadableStream)
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

export function isReadableStream(x: unknown): x is ReadableStream | NodeJS.ReadableStream {
  return isNodeReadableStream(x) || isWebReadableStream(x);
}
