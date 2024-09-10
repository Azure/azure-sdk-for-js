// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const decoder = typeof Buffer === "undefined" ? new TextDecoder("ascii") : undefined;

const encoder = typeof Buffer === "undefined" ? new TextEncoder() : undefined;

const decode: (buffer: ArrayBuffer) => string = decoder
  ? (buffer) => decoder.decode(buffer)
  : (buffer) => (buffer as Buffer).toString("ascii");

const encode: (str: string) => Uint8Array = encoder
  ? (str) => encoder.encode(str)
  : (str) => Buffer.from(str, "utf8");

/**
 * Converts a string into a utf8 encoded byte array.
 * @param content - The utf8 string to convert.
 * @internal
 */
export function stringToBytes(content: string): Uint8Array {
  return encode(content);
}

/**
 * Converts a utf8 string into a byte array.
 * @param content - The utf8 string to convert.
 * @internal
 */
export function bytesToString(content: Uint8Array): string {
  return decode(content);
}
