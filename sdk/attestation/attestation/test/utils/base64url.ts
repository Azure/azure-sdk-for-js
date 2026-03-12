// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Decodes a base64 string into a byte array.
 * @param value - the base64 string to decode
 */
function decodeStringFromBase64(value: string): Uint8Array<ArrayBuffer> {
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
export function decodeString(value: string): Uint8Array<ArrayBuffer> {
  const encoded = value.replace(/-/g, "+").replace(/_/g, "/");
  const paddedEncoded = fixPadding(encoded);
  return decodeStringFromBase64(paddedEncoded);
}
