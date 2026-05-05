// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Calculate the byte length of a UTF-8 encoded string.
 * Works in all JavaScript environments.
 */
export function utf8ByteLength(str: string): number {
  return new TextEncoder().encode(str).length;
}
