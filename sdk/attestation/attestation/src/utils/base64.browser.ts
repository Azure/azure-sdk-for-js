// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/// <reference lib="dom" />

/**
 * Encodes a string in base64 format.
 * @param value - the string to encode
 */
export function encodeString(value: string): string {
  return btoa(value);
}

/**
 * Encodes a byte array in base64 format.
 * @param value - the Uint8Array to encode
 */
export function base64EncodeByteArray(value: Uint8Array): string {
  let str = "";
  for (let i = 0; i < value.length; i++) {
    str += String.fromCharCode(value[i]);
  }
  return btoa(str);
}

/**
 * Encodes a byte array in base64 format.
 * @param value - the Uint8Array to encode
 */
export function base64UrlEncodeByteArray(value: Uint8Array): string {
  let str = "";
  for (let i = 0; i < value.length; i++) {
    str += String.fromCharCode(value[i]);
  }
  const base64 = btoa(str);
  // Convert the base64 buffer to base64url.
  return base64.replace(/\+/g, "-").replace(/\//, "_").split("=")[0];
}

/**
 * Decodes a base64 string into a byte array.
 * @param value - the base64 string to decode
 */
export function base64DecodeString(value: string): Uint8Array {
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
