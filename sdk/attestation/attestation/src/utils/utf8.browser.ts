// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/// <reference lib="dom" />

import { TextDecoder, TextEncoder } from "./textEncoding";

let encoder: TextEncoder | undefined;
let decoder: TextDecoder | undefined;

/**
 * Returns a cached TextEncoder.
 * @internal
 */
function getTextEncoder(): TextEncoder {
  if (encoder) {
    return encoder;
  }

  if (typeof TextEncoder === "undefined") {
    throw new Error(`Your browser environment is missing "TextEncoder".`);
  }

  encoder = new TextEncoder();
  return encoder;
}

/**
 * Returns a cached TextEncoder.
 * @internal
 */
 function getTextDecoder(): TextDecoder {
  if (decoder) {
    return decoder;
  }

  if (typeof TextDecoder === "undefined") {
    throw new Error(`Your browser environment is missing "TextDecoder".`);
  }

  decoder = new TextDecoder();
  return decoder;
}


/**
 * Converts a utf8 string into a byte array.
 * @param content - The utf8 string to convert.
 * @internal
 */
export function utf8ToBytes(content: string): Uint8Array {
  return getTextEncoder().encode(content);
}

/**
 * Converts a utf8 string into a byte array.
 * @param content - The utf8 string to convert.
 * @internal
 */
 export function bytesToString(content: Uint8Array): string {
  return getTextDecoder().decode(content);
}
