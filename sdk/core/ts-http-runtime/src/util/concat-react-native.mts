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
 * React Native's Blob constructor only accepts Blob or string arrays and throws
 * for ArrayBufferView (including Uint8Array), so Uint8Array parts are decoded
 * to strings before being passed to the Blob constructor.
 *
 * @param sources - array of sources for the concatenation
 * @returns a `Blob` representing all the concatenated inputs.
 *
 * @internal
 */
export async function concat(
  sources: (ConcatSource | (() => ConcatSource))[],
): Promise<(() => NodeJS.ReadableStream) | Blob> {
  const parts: (Blob | string)[] = [];
  for (const source of sources) {
    const resolved = typeof source === "function" ? source() : source;
    if (resolved instanceof Blob) {
      parts.push(resolved);
    } else if (resolved instanceof Uint8Array) {
      // RN's Blob constructor throws for Uint8Array, decode to string first
      parts.push(new TextDecoder().decode(resolved));
    } else {
      throw new Error(
        "Unsupported source type. Only Blob and Uint8Array are supported in React Native.",
      );
    }
  }

  return new Blob(parts);
}
