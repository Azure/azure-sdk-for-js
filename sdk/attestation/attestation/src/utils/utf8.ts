// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Converts a string into a utf8 encoded byte array.
 * @param content - The utf8 string to convert.
 * @internal
 */
export function stringToBytes(content: string): Uint8Array {
  return Buffer.from(content, "utf8");
}

/**
 * Converts a utf8 string into a byte array.
 * @param content - The utf8 string to convert.
 * @internal
 */
export function bytesToString(content: Uint8Array): string {
  return Buffer.from(content.buffer, content.byteOffset, content.byteLength).toString("ascii");
}
