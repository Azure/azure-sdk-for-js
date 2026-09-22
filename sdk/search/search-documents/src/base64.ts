// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { stringToUint8Array, uint8ArrayToString } from "@azure/core-util";

/**
 * Encodes a string in base64 format.
 * @param value - The string to encode.
 */
export function encode(value: string): string {
  return uint8ArrayToString(stringToUint8Array(value, "utf-8"), "base64");
}

/**
 * Decodes a base64 string into a regular string.
 * @param value - The base64 string to decode.
 */
export function decode(value: string): string {
  return uint8ArrayToString(stringToUint8Array(value, "base64"), "utf-8");
}
