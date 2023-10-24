// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Converts an ArrayBuffer to a hexadecimal string.
 * @param buffer - Raw binary data.
 * @internal
 */
export function bufferToHex(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  return Array.prototype.map.call(bytes, byteToHex).join("");
}

/**
 * Converts a byte to a hexadecimal string.
 * @param byte - An integer representation of a byte.
 * @internal
 */
function byteToHex(byte: number): string {
  const hex = byte.toString(16);
  return hex.length === 2 ? hex : `0${hex}`;
}
