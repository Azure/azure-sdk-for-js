// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/** The supported character encoding type */
export type EncodingType = "utf-8" | "base64" | "base64url" | "hex";

/**
 * The helper that transforms bytes with specific character encoding into string
 * @param bytes - the uint8array bytes
 * @param format - the format we use to encode the byte
 * @returns a string of the encoded string
 */
export function uint8ArrayToString(bytes: Uint8Array, format: EncodingType): string {
  return Buffer.from(bytes).toString(format);
}

/**
 * The helper that transforms string to specific character encoded bytes array.
 * @param value - the string to be converted
 * @param format - the format we use to decode the value
 * @returns a uint8array
 */
export function stringToUint8Array(value: string, format: EncodingType): Uint8Array {
  return Buffer.from(value, format);
}
