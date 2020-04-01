// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Encodes a string in base64 format.
 * @param value the string to encode
 */
export function encode(value: string): string {
  return Buffer.from(value).toString("base64");
}

/**
 * Decodes a base64 string into a regular string
 * @param value the base64 string to decode
 */
export function decode(value: string): string {
  return Buffer.from(value, "base64").toString();
}
