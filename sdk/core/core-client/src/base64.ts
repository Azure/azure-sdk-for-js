// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Encodes a string in base64 format.
 * @param value the string to encode
 * @internal @ignore
 */
export function encodeString(value: string): string {
  return Buffer.from(value).toString("base64");
}

/**
 * Encodes a byte array in base64 format.
 * @param value the Uint8Aray to encode
 * @internal @ignore
 */
export function encodeByteArray(value: Uint8Array): string {
  // Buffer.from accepts <ArrayBuffer> | <SharedArrayBuffer>-- the TypeScript definition is off here
  // https://nodejs.org/api/buffer.html#buffer_class_method_buffer_from_arraybuffer_byteoffset_length
  const bufferValue = value instanceof Buffer ? value : Buffer.from(value.buffer as ArrayBuffer);
  return bufferValue.toString("base64");
}

/**
 * Decodes a base64 string into a byte array.
 * @param value the base64 string to decode
 * @internal @ignore
 */
export function decodeString(value: string): Uint8Array {
  return Buffer.from(value, "base64");
}
