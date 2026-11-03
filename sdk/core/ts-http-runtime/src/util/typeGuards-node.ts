// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Checks for the readable-stream and event methods needed for Node uploads.
 * Supports structural streams without requiring a native Readable instance.
 *
 * @internal
 */
export function isNodeReadableStream(x: unknown): x is NodeJS.ReadableStream {
  return (
    typeof x === "object" &&
    x !== null &&
    "readable" in x &&
    typeof x.readable === "boolean" &&
    "pipe" in x &&
    typeof x.pipe === "function" &&
    "unpipe" in x &&
    typeof x.unpipe === "function" &&
    "on" in x &&
    typeof x.on === "function" &&
    "once" in x &&
    typeof x.once === "function" &&
    "removeListener" in x &&
    typeof x.removeListener === "function"
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
