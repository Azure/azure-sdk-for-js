// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { types } from "node:util";

/** Determines whether a request body is an array buffer or view. */
export function isArrayBuffer(body: unknown): body is ArrayBuffer | ArrayBufferView {
  return types.isArrayBuffer(body) || ArrayBuffer.isView(body);
}

/** Converts an array buffer or view to a Node buffer without copying when possible. */
export function arrayBufferToBuffer(body: ArrayBuffer | ArrayBufferView): Buffer {
  if (Buffer.isBuffer(body)) {
    return body;
  }

  return ArrayBuffer.isView(body)
    ? Buffer.from(body.buffer, body.byteOffset, body.byteLength)
    : Buffer.from(body);
}
