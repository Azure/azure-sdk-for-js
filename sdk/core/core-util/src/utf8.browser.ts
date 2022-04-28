// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// stubs for browser TextEncoder
interface TextEncoder {
  encode(input?: string): Uint8Array;
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
declare const TextEncoder: {
  prototype: TextEncoder;
  new (): TextEncoder;
};

let encoder: TextEncoder | undefined;

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
 * Converts a utf8 string into a byte array.
 * @param content - The utf8 string to convert.
 * @internal
 */
export function utf8ToBytes(content: string): Uint8Array {
  return getTextEncoder().encode(content);
}
