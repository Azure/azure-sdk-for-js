// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { isReadableStream } from "./isReadableStream.js";

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
