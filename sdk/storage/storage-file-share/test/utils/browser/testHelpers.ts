// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Browser-specific test utilities for file operations.
 */

/**
 * Read body from downloading operation methods to string.
 * Browser only.
 */
export async function bodyToString(
  { contentAsBlob }: { contentAsBlob?: Promise<Blob> },
  length?: number,
): Promise<string> {
  if (contentAsBlob) {
    const blob = await contentAsBlob;
    const text = await blob.text();
    return length !== undefined ? text.slice(0, length) : text;
  }

  throw new Error("Unable to extract body");
}

/**
 * Compare download response body with a Uint8Array.
 * Browser only.
 */
export async function compareBodyWithUint8Array(
  { contentAsBlob }: { contentAsBlob?: Promise<Blob> },
  uint8Array: Uint8Array,
): Promise<boolean> {
  if (contentAsBlob) {
    const blob = await contentAsBlob;
    const arrayBuffer = await blob.arrayBuffer();
    const data = new Uint8Array(arrayBuffer);
    if (data.length !== uint8Array.length) {
      return false;
    }
    for (let i = 0; i < uint8Array.length; i++) {
      if (data[i] !== uint8Array[i]) {
        return false;
      }
    }
    return true;
  }
  throw new Error("Unable to extract body");
}
