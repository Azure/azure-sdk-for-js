// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Encodes a string in base64 format.
 * @param value - the string to encode
 */
function encodeString(value) {
  return Buffer.from(value).toString("base64");
}

/**
 * Encodes a byte array in base64 format.
 * @param value - the Uint8Array to encode
 */
function encodeByteArray(value) {
  // Buffer.from accepts <ArrayBuffer> | <SharedArrayBuffer>-- the TypeScript definition is off here
  // https://nodejs.org/api/buffer.html#buffer_class_method_buffer_from_arraybuffer_byteoffset_length
  const bufferValue = value instanceof Buffer ? value : Buffer.from(value.buffer);
  return bufferValue.toString("base64");
}

/**
 * Decodes a base64 string into a byte array.
 * @param value - the base64 string to decode
 */
function decodeStringFromBase64(value) {
  return Buffer.from(value, "base64");
}

/**
 * Adds missing padding to a Base64 encoded string
 * @param unpadded - The unpadded input string
 * @returns The padded string
 */
function fixPadding(unpadded) {
  const count = 3 - ((unpadded.length + 3) % 4);
  return unpadded + "=".repeat(count);
}

/**
 * Decodes a base64url string into a byte array.
 * @param value - the base64url string to decode
 */
function decodeString(value) {
  const encoded = value.replace(/-/g, "+").replace(/_/g, "/");
  const paddedEncoded = fixPadding(encoded);
  return decodeStringFromBase64(paddedEncoded);
}

module.exports = { encodeString, encodeByteArray, decodeString };
