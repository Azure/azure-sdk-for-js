// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Checks if the given value is a Node.js readable stream.
 *
 * @internal
 */
export function isNodeReadableStream(x: unknown): x is NodeJS.ReadableStream {
  return typeof x === "object" && x !== null && "pipe" in x && typeof x.pipe === "function";
}

/**
 * Checks if the given value is a web ReadableStream.
 *
 * @internal
 */
export function isWebReadableStream(x: unknown): x is ReadableStream {
  return x instanceof ReadableStream;
}
