// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { stringToUint8Array, uint8ArrayToString } from "@azure/core-util";

/**
 * Converts a string into a utf8 encoded byte array.
 * @param content - The utf8 string to convert.
 * @internal
 */
export function stringToBytes(content: string): Uint8Array {
  return stringToUint8Array(content, "utf-8");
}

/**
 * Converts a utf8 string into a byte array.
 * @param content - The utf8 string to convert.
 * @internal
 */
export function bytesToString(content: Uint8Array): string {
  return uint8ArrayToString(content, "utf-8");
}
