// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * base64Encode encodes a byte array as a base64 string.
 *
 * @param value the byte array to be encoded in base64
 */
export function base64Encode(value: Uint8Array): string {
  const bufferValue = value instanceof Buffer ? value : Buffer.from(value.buffer);
  return bufferValue.toString("base64");
}

/**
 * base64Decode decodes a valid base64 encoded string into a byte array.
 *
 * @param value the valid base64 string to be decoded
 */
export function base64Decode(value: string): Uint8Array {
  return Buffer.from(value, "base64");
}
