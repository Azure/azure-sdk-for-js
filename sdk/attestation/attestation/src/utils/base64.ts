// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { stringToUint8Array, uint8ArrayToString } from "@azure/core-util";

/**
 * Encodes a string in base64 format.
 * @param value - the string to encode
 */
export function encodeString(value: string): string {
  return uint8ArrayToString(stringToUint8Array(value, "utf-8"), "base64");
}

/**
 * Encodes a byte array in base64 format.
 * @param value - the Uint8Array to encode
 */
export function base64EncodeByteArray(value: Uint8Array): string {
  return uint8ArrayToString(value, "base64");
}

/**
 * Encodes a byte array in base64url format.
 * @param value - the Uint8Array to encode
 */
export function base64UrlEncodeByteArray(value: Uint8Array): string {
  return uint8ArrayToString(value, "base64url");
}

/**
 * Decodes a base64 string into a byte array.
 * @param value - the base64 string to decode
 */
export function base64DecodeString(value: string): Uint8Array {
  return stringToUint8Array(value, "base64");
}

/**
 * Decodes a base64url string into a byte array.
 * @param value - the base64url string to decode
 */
export function base64UrlDecodeString(value: string): Uint8Array {
  return stringToUint8Array(value, "base64url");
}

export function hexToByteArray(value: string): Uint8Array {
  if (value.length % 2 !== 0) {
    throw new Error("Invalid hex string: length must be even");
  }
  return stringToUint8Array(value, "hex");
}

export function byteArrayToHex(value: Uint8Array): string {
  return uint8ArrayToString(value, "hex");
}
