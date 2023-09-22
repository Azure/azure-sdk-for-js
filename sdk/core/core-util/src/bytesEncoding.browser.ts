// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

declare global {
  // stub these out for the browser
  function btoa(input: string): string;
  function atob(input: string): string;
  class TextDecoder {
    constructor(encoding?: string);
    decode(input?: ArrayBufferView | ArrayBuffer): string;
  }
  class TextEncoder {
    constructor(encoding?: string);
    encode(input?: string): Uint8Array;
  }
}

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
export function uint8ArrayToBase64(uint8Array: Uint8Array): string {
  const decoder = new TextDecoder();
  const dataString = decoder.decode(uint8Array);
  return btoa(dataString);
}

/**
 * Decodes a Uint8Array into a Base64Url string.
 * @internal
 */
export function uint8ArrayToBase64Url(bytes: Uint8Array): string {
  return uint8ArrayToBase64(bytes).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

/**
 * Decodes a Uint8Array into a javascript string.
 * @internal
 */
export function uint8ArrayToUtf8String(uint8Array: Uint8Array): string {
  const decoder = new TextDecoder("utf-8");
  const dataString = decoder.decode(uint8Array);
  return dataString;
}

/**
 * Encodes a JavaScript string into a Uint8Array.
 * @internal
 */
export function utf8StringToUint8Array(value: string): Uint8Array {
  return new TextEncoder("utf-8").encode(value);
}

/**
 * Encodes a Base64 string into a Uint8Array.
 * @internal
 */
export function base64ToUint8Array(value: string): Uint8Array {
  return new TextEncoder().encode(atob(value));
}

/**
 * Encodes a Base64Url string into a Uint8Array.
 * @internal
 */
export function base64UrlToUint8Array(value: string): Uint8Array {
  const base64String = value.replace(/-/g, "+").replace(/_/g, "/");
  return base64ToUint8Array(base64String);
}
