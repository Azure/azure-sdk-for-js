// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Encodes a string in base64 format.
 * @param value The string to encode.
 */
export function encode(value: string): string {
  return btoa(value);
}

/**
 * Decodes a base64 string into a regular string.
 * @param value The base64 string to decode.
 */
export function decode(value: string): string {
  return atob(value);
}
