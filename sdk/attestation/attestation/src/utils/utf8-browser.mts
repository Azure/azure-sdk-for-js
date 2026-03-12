// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const decoder = new TextDecoder("ascii");
const encoder = new TextEncoder();

/**
 * Converts a string into a utf8 encoded byte array.
 * @param content - The utf8 string to convert.
 * @internal
 */
export function stringToBytes(content: string): Uint8Array {
  return encoder.encode(content);
}

/**
 * Converts a utf8 string into a byte array.
 * @param content - The utf8 string to convert.
 * @internal
 */
export function bytesToString(content: Uint8Array): string {
  return decoder.decode(content);
}
