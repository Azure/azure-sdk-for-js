// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { isWebReadableStream } from "./typeGuards.js";

/**
 * Accepted binary data types for concat
 *
 * @internal
 */
export type ConcatSource = ReadableStream<Uint8Array> | NodeJS.ReadableStream | Uint8Array | Blob;

/**
 * Utility function that concatenates a set of binary inputs into one combined output.
 *
 * React Native runs on the Hermes engine, which implements a subset of web
 * APIs with narrower type contracts than full browsers:
 *
 * - **Blob**: natively supported, but its constructor only accepts
 *   `(Blob | string)[]` — NOT the full `BlobPart[]` union. Passing a
 *   `Uint8Array` to `new Blob([uint8])` throws at runtime.
 *   See https://github.com/facebook/react-native/issues/44125
 *
 * - **Uint8Array**: works as a data type, but cannot be passed to the Blob
 *   constructor without a polyfill (e.g. react-native-blob-jsi-helper).
 *   See https://github.com/facebook/react-native/issues/41079
 *
 * - **ReadableStream / Response**: not available by default. Apps can polyfill
 *   these (e.g. web-streams-polyfill + react-native-fetch-api).
 *
 * This implementation handles all source types and defers to the runtime,
 * so apps with the appropriate polyfills get correct behavior while apps
 * without them get the engine's native error.
 *
 * @param sources - array of sources for the concatenation
 * @returns a `Blob` representing all the concatenated inputs.
 *
 * @internal
 */
export async function concat(
  sources: (ConcatSource | (() => ConcatSource))[],
): Promise<(() => NodeJS.ReadableStream) | Blob> {
  const parts: (Blob | Uint8Array)[] = [];
  for (const source of sources) {
    const resolved = typeof source === "function" ? source() : source;
    if (resolved instanceof Blob || resolved instanceof Uint8Array) {
      parts.push(resolved);
    } else if (isWebReadableStream(resolved)) {
      // Requires ReadableStream + Response polyfills in RN
      parts.push(await new Response(resolved).blob());
    } else {
      throw new Error(`Unsupported source type: ${typeof resolved}`);
    }
  }

  // Hermes's Blob constructor natively accepts only (Blob | string)[].
  // Uint8Array requires a polyfill — the cast lets it through at compile
  // time and defers the check to the runtime.
  return new Blob(parts as (Blob | string)[]);
}
