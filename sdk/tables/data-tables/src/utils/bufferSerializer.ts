// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Encodes a byte array in base64 format.
 * @param value - The Uint8Aray or string to encode
 */
export function base64Encode(value: Uint8Array | string): string {
  if (value instanceof Uint8Array) {
    const bufferValue = value instanceof Buffer ? value : Buffer.from(value.buffer);
    return bufferValue.toString("base64");
  } else {
    return Buffer.from(value).toString("base64");
  }
}

/**
 * Decodes a base64 string into a byte array.
 * @param value - The base64 string to decode
 */
export function base64Decode(value: string): Uint8Array {
  return Buffer.from(value, "base64");
}
