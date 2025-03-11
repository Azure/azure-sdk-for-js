// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NodeJSReadableStream } from "@azure/core-rest-pipeline";
import { isReadableStream } from "./isReadableStream.js";

export function isBinaryBody(
  body: unknown,
): body is
  | Uint8Array
  | NodeJSReadableStream
  | ReadableStream<Uint8Array>
  | (() => NodeJSReadableStream)
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
