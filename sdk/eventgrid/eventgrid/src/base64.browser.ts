// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/// <reference lib="dom" />

/**
 * base64Encode encodes a byte array as a base64 string.
 *
 * @param value the byte array to be encoded in base64
 */
export function base64Encode(value: Uint8Array): string {
  let str = "";
  for (let i = 0; i < value.length; i++) {
    str += String.fromCharCode(value[i]);
  }
  return btoa(str);
}

/**
 * base64Decode decodes a valid base64 encoded string into a byte array.
 *
 * @param value the valid base64 string to be decoded
 */
export function base64Decode(value: string): Uint8Array {
  const byteString = atob(value);
  const byteArray = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    byteArray[i] = byteString.charCodeAt(i);
  }
  return byteArray;
}
