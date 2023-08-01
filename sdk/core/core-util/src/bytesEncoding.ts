// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/** The supported character encoding type */
export type EncodingType = "utf-8" | "base64" | "base64url";

/**
 * The helper that transforms bytes with specific character encoding into string
 * @param bytes - the uint8array bytes
 * @param format - the format we use to encode the byte
 * @returns a string of the encoded string
 */
export function uint8ArrayToString(bytes: Uint8Array, format: EncodingType): string {
  switch (format) {
    case "utf-8":
      return uint8ArrayToUtf8String(bytes);
    case "base64":
      return uint8ArrayToBase64(bytes);
    case "base64url":
      return uint8ArrayToBase64Url(bytes);
  }
}

/**
 * The helper that transforms string to specific character encoded bytes array.
 * @param value - the string to be converted
 * @param format - the format we use to decode the value
 * @returns a uint8array
 */
export function stringToUint8Array(value: string, format: EncodingType): Uint8Array {
  switch (format) {
    case "utf-8":
      return utf8StringToUint8Array(value);
    case "base64":
      return base64ToUint8Array(value);
    case "base64url":
      return base64UrlToUint8Array(value);
  }
}

/**
 * Decodes a Uint8Array into a Base64 string.
 * @internal
 */
export function uint8ArrayToBase64(bytes: Uint8Array): string {
  return Buffer.from(bytes).toString("base64");
}

/**
 * Decodes a Uint8Array into a Base64Url string.
 * @internal
 */
export function uint8ArrayToBase64Url(bytes: Uint8Array): string {
  return Buffer.from(bytes).toString("base64url");
}

/**
 * Decodes a Uint8Array into a javascript string.
 * @internal
 */
export function uint8ArrayToUtf8String(bytes: Uint8Array): string {
  return Buffer.from(bytes).toString("utf-8");
}

/**
 * Encodes a JavaScript string into a Uint8Array.
 * @internal
 */
export function utf8StringToUint8Array(value: string): Uint8Array {
  return Buffer.from(value);
}

/**
 * Encodes a Base64 string into a Uint8Array.
 * @internal
 */
export function base64ToUint8Array(value: string): Uint8Array {
  return Buffer.from(value, "base64");
}

/**
 * Encodes a Base64Url string into a Uint8Array.
 * @internal
 */
export function base64UrlToUint8Array(value: string): Uint8Array {
  return Buffer.from(value, "base64url");
}
