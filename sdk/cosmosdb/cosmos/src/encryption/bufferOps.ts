// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Decode a base64 string to a Buffer.
 * @internal
 */
export function base64ToUint8Array(base64: string): Buffer {
  return Buffer.from(base64, "base64");
}

/**
 * Convert a Uint8Array or Buffer to a Buffer.
 * @internal
 */
export function toUint8Array(input: Uint8Array): Buffer {
  return Buffer.from(input);
}

/**
 * Encode a Uint8Array to a base64 string.
 * @internal
 */
export function uint8ArrayToBase64(input: Uint8Array): string {
  return Buffer.from(input).toString("base64");
}

/**
 * Encode a UTF-8 string to a base64 string.
 * @internal
 */
export function stringToBase64(input: string): string {
  return Buffer.from(input, "utf8").toString("base64");
}
