// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/// <reference lib="dom" />

/**
 * Decodes a base64 string into a byte array.
 * @param value - the base64 string to decode
 */
function decodeStringFromBase64(value: string): Uint8Array {
  const byteString = atob(value);
  const arr = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    arr[i] = byteString.charCodeAt(i);
  }
  return arr;
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
export function decodeString(value: string): Uint8Array {
  const encoded = value.replace(/-/g, "+").replace(/_/g, "/");
  const paddedEncoded = fixPadding(encoded);
  return decodeStringFromBase64(paddedEncoded);
}
