// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

declare global {
  // stub these out for the browser
  function btoa(input: string): string;
  function atob(input: string): string;
}

import { TextEncoder } from "util";
import { isNode } from "./checkEnvironment";

export type EncodingType = "utf-8" | "base64" | "base64url";

/**
 *
 * @param bytes the uint8array bytes
 * @param format the format we use to encode the byte
 * @returns a string of the encoded string
 */
export function uint8ArrayToString(bytes: Uint8Array, format: EncodingType) {
  switch (format) {
    case "utf-8":
      return uint8ArrayToUtf8String(bytes);
    case "base64":
      return uint8ArrayToBase64(bytes);
    case "base64url":
      return uint8ArrayToBase64(bytes);
  }
}

/**
 *
 * @param value the string to be converted
 * @param format the format we use to decode the value
 * @returns a uint8array
 */
export function stringToUint8Array(value: string, format: EncodingType) {
  switch (format) {
    case "utf-8":
      return utf8StringToUint8Array(value);
    case "base64":
      return base64ToUint8Array(value);
    case "base64url":
      return base64ToUint8Array(value);
  }
}

/**
 * Decodes a Uint8Array into a Base64 string.
 * @internal
 */
export function uint8ArrayToBase64(bytes: Uint8Array): string {
  if (isNode) {
    return Buffer.from(bytes).toString("base64");
  } else {
    return btoa(String.fromCharCode.apply(null, bytes as any as number[]));
  }
}

/**
 * Decodes a Uint8Array into a javascript string.
 * @internal
 */
export function uint8ArrayToUtf8String(bytes: Uint8Array): string {
  if (isNode) {
    return Buffer.from(bytes).toString();
  } else {
    return btoa(String.fromCharCode.apply(null, bytes as any as number[]));
  }
}

/**
 * Encodes a JavaScript string into a Uint8Array.
 * @internal
 */
export function utf8StringToUint8Array(value: string): Uint8Array {
  if (isNode) {
    return Buffer.from(value);
  } else {
    return new TextEncoder().encode(value);
  }
}

/**
 * Encodes a Base64 string into a Uint8Array.
 * @internal
 */
export function base64ToUint8Array(value: string): Uint8Array {
  if (isNode) {
    return Buffer.from(value, "base64");
  } else {
    return Uint8Array.from(atob(value), (c) => c.charCodeAt(0));
  }
}
