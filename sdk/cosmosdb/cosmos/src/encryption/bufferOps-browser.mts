// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @internal
 */
export function base64ToUint8Array(_base64: string): Uint8Array {
  throw new Error("Client-side Encryption not supported in browser environment");
}

/**
 * @internal
 */
export function toUint8Array(_input: Uint8Array): Uint8Array {
  throw new Error("Client-side Encryption not supported in browser environment");
}

/**
 * @internal
 */
export function uint8ArrayToBase64(_input: Uint8Array): string {
  throw new Error("Client-side Encryption not supported in browser environment");
}

/**
 * Encode a UTF-8 string to a base64 string.
 * @internal
 */
export function stringToBase64(input: string): string {
  // TextEncoder produces UTF-8 bytes; btoa expects Latin-1 so we must escape
  const bytes = new TextEncoder().encode(input);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}
