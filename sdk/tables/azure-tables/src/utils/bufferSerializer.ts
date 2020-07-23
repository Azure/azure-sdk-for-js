// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export function isUint8Array(value: any): boolean {
  return value instanceof Uint8Array;
}

/**
 * Encodes a byte array in base64 format.
 * @param value the Uint8Aray to encode
 */
export function encodeByteArray(value: Uint8Array): string {
  const bufferValue = value instanceof Buffer ? value : Buffer.from(value.buffer);
  return bufferValue.toString("base64");
}

/**
 * Decodes a base64 string into a byte array.
 * @param value the base64 string to decode
 */
export function decodeString(value: string): Uint8Array {
  return Buffer.from(value, "base64");
}
