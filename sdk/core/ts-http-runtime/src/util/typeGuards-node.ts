// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Readable } from "stream";

/**
 * Checks if the given value is a Node.js readable stream.
 *
 * @internal
 */
export function isNodeReadableStream(x: unknown): x is NodeJS.ReadableStream {
  return x instanceof Readable;
}

/**
 * Checks if the given value is a web ReadableStream.
 *
 * @internal
 */
export function isWebReadableStream(x: unknown): x is ReadableStream {
  return x instanceof ReadableStream;
}
