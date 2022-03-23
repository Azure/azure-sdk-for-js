// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Encodes a string in base64 format.
 * @param value - the string to encode
 */
export function encodeString(value: string): string {
  return Buffer.from(value).toString("base64");
}

/**
 * Encodes a byte array in base64 format.
 * @param value - the Uint8Array to encode
 */
export function base64EncodeByteArray(value: Uint8Array): string {
  // Buffer.from accepts <ArrayBuffer> | <SharedArrayBuffer>-- the TypeScript definition is off here
  // https://nodejs.org/api/buffer.html#buffer_class_method_buffer_from_arraybuffer_byteoffset_length
  const bufferValue = value instanceof Buffer ? value : Buffer.from(value.buffer as ArrayBuffer);
  return bufferValue.toString("base64");
}

/**
 * Encodes a byte array in base64 format.
 * @param value - the Uint8Array to encode
 */
export function base64UrlEncodeByteArray(value: Uint8Array): string {
  // Buffer.from accepts <ArrayBuffer> | <SharedArrayBuffer>-- the TypeScript definition is off here
  // https://nodejs.org/api/buffer.html#buffer_class_method_buffer_from_arraybuffer_byteoffset_length
  const bufferValue = value instanceof Buffer ? value : Buffer.from(value.buffer as ArrayBuffer);
  const base64 = bufferValue.toString("base64");
  // Convert the base64 buffer to base64url.
  return base64.replace(/\+/g, "-").replace(/\//, "_").split("=")[0];
}

/**
 * Decodes a base64 string into a byte array.
 * @param value - the base64 string to decode
 */
export function base64DecodeString(value: string): Uint8Array {
  return Buffer.from(value, "base64");
}

/**
 * Adds missing padding to a Base64 encoded string
 * @param unpadded - The unpadded input string
 * @returns The padded string
 */
function fixPadding(unpadded: string): string {
  const count = 3 - ((unpadded.length + 3) % 4);
  return unpadded + "=".repeat(count);
}

/**
 * Decodes a base64url string into a byte array.
 * @param value - the base64url string to decode
 */
export function base64UrlDecodeString(value: string): Uint8Array {
  const encoded = value.replace(/-/g, "+").replace(/_/g, "/");
  const paddedEncoded = fixPadding(encoded);
  return base64DecodeString(paddedEncoded);
}

export function hexToByteArray(value: string): Uint8Array {
  if (value.length % 2 !== 0) {
    throw new Error("base64FromHex: Input must be a multiple of 2 characters");
  }
  const byteArray = new Array();
  for (let i = 0; i < value.length; i += 2) {
    byteArray.push(parseInt(value.substr(i, 2), 16));
  }
  return Uint8Array.from(byteArray);
}

export function byteArrayToHex(value: Uint8Array): string {
  return value.reduce((str, byte) => str + byte.toString(16).padStart(2, "0"), "");
}
