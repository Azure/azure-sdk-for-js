// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Decodes a Uint8Array to a UTF-8 string, preserving U+FEFF characters like Node's Buffer.
 *
 * @internal
 */
export function decodeUtf8(bytes: Uint8Array): string {
  return new TextDecoder("utf-8", { ignoreBOM: true }).decode(bytes);
}

/**
 * Encodes a string to a UTF-8 Uint8Array.
 *
 * @internal
 */
export function encodeUtf8(value: string): Uint8Array<ArrayBuffer> {
  return new TextEncoder().encode(value);
}
