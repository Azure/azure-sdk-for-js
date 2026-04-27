// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// React Native's type definitions do not include TextDecoder/TextEncoder,
// but they are available at runtime in the Hermes engine.
// See https://github.com/facebook/react-native/issues/56325
declare global {
  var TextDecoder: (new () => { decode(input: Uint8Array): string }) | undefined;
  var TextEncoder: (new () => { encode(input: string): Uint8Array<ArrayBuffer> }) | undefined;
}

/**
 * Decodes a Uint8Array to a UTF-8 string.
 *
 * @internal
 */
export function decodeUtf8(bytes: Uint8Array): string {
  if (typeof TextDecoder === "undefined") {
    throw new Error("TextDecoder is not available in this environment. Please provide a polyfill.");
  }
  return new TextDecoder().decode(bytes);
}

/**
 * Encodes a string to a UTF-8 Uint8Array.
 *
 * @internal
 */
export function encodeUtf8(value: string): Uint8Array<ArrayBuffer> {
  if (typeof TextEncoder === "undefined") {
    throw new Error("TextEncoder is not available in this environment. Please provide a polyfill.");
  }
  return new TextEncoder().encode(value);
}
