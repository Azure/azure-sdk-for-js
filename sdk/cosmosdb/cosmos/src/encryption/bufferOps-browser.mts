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
