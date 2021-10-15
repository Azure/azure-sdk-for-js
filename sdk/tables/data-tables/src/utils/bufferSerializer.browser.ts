// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Encodes a byte array in base64 format.
 * @param value - The Uint8Aray or string to encode
 */
export function base64Encode(value: Uint8Array | string): string {
  let str = "";
  if (typeof value === "string") {
    str = value;
  } else {
    for (let i = 0; i < value.length; i++) {
      str += String.fromCharCode(value[i]);
    }
  }
  return btoa(str);
}

/**
 * Decodes a base64 string into a byte array.
 * @param value - The base64 string to decode
 */
export function base64Decode(value: string): Uint8Array {
  const byteString = atob(value);
  const byteArray = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    byteArray[i] = byteString.charCodeAt(i);
  }
  return byteArray;
}
