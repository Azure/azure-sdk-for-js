// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { stringToUint8Array, uint8ArrayToString } from "@azure/core-util";

/**
 * Encodes a byte array in base64 format.
 * @param value - The Uint8Aray or string to encode
 */
export function base64Encode(value: Uint8Array | string): string {
  if (typeof value === "string") {
    return uint8ArrayToString(stringToUint8Array(value, "utf-8"), "base64");
  }
  return uint8ArrayToString(value, "base64");
}

/**
 * Decodes a base64 string into a byte array.
 * @param value - The base64 string to decode
 */
export function base64Decode(value: string): Uint8Array {
  return stringToUint8Array(value, "base64");
}
