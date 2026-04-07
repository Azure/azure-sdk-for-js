// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Accepted binary data types for concat
 *
 * @internal
 */
export type ConcatSource = ReadableStream<Uint8Array> | NodeJS.ReadableStream | Uint8Array | Blob;

/**
 * Utility function that concatenates a set of binary inputs into one combined output.
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
    } else {
      throw new Error(
        "Unsupported source type. Only Blob and Uint8Array are supported in React Native.",
      );
    }
  }

  // RN's Blob constructor natively accepts only Blob | string, but many apps
  // polyfill it to also accept Uint8Array. Let the runtime decide.
  return new Blob(parts as (Blob | string)[]);
}
