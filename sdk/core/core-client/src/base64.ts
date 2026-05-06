// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { stringToUint8Array, uint8ArrayToString } from "@azure/core-util";

/**
 * Encodes a string in base64 format.
 * @param value - the string to encode
 * @internal
 */
export function encodeString(value: string): string {
  return uint8ArrayToString(stringToUint8Array(value, "utf-8"), "base64");
}

/**
 * Encodes a byte array in base64 format.
 * @param value - the Uint8Array to encode
 * @internal
 */
export function encodeByteArray(value: Uint8Array): string {
  return uint8ArrayToString(value, "base64");
}

/**
 * Decodes a base64 string into a byte array.
 * @param value - the base64 string to decode
 * @internal
 */
export function decodeString(value: string): Uint8Array {
  return stringToUint8Array(value, "base64");
}

/**
 * Decodes a base64 string into a string.
 * @param value - the base64 string to decode
 * @internal
 */
export function decodeStringToString(value: string): string {
  return uint8ArrayToString(stringToUint8Array(value, "base64"), "utf-8");
}
