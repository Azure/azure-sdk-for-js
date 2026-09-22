// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Node.js readable streams are not natively available in the browser, but apps
 * may polyfill them. Use duck-typing so polyfilled streams are detected at runtime.
 *
 * @internal
 */
export function isNodeReadableStream(x: unknown): x is never {
  return (
    x !== null &&
    x !== undefined &&
    typeof x === "object" &&
    "pipe" in x &&
    typeof x.pipe === "function" &&
    "read" in x &&
    typeof x.read === "function"
  );
}

/**
 * Checks if the given value is a web ReadableStream.
 *
 * @internal
 */
export function isWebReadableStream(x: unknown): x is ReadableStream {
  return x instanceof ReadableStream;
}
