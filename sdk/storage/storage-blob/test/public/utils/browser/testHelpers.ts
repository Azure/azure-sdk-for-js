// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Browser-specific test utilities for blob operations.
 */

/**
 * Compare two ArrayBuffers for equality.
 */
export function arrayBufferEqual(buf1: ArrayBuffer, buf2: ArrayBuffer): boolean {
  if (buf1.byteLength !== buf2.byteLength) {
    return false;
  }

  const uint8Arr1 = new Uint8Array(buf1);
  const uint8Arr2 = new Uint8Array(buf2);

  for (let i = 0; i < uint8Arr1.length; i++) {
    if (uint8Arr1[i] !== uint8Arr2[i]) {
      return false;
    }
  }

  return true;
}

/**
 * Create a mock Browser File with specified name and deterministic content.
 * Uses a repeating pattern instead of random content to ensure consistency
 * between recording and playback modes.
 */
export function getBrowserFile(name: string, size: number): File {
  const uint8Arr = new Uint8Array(size);
  for (let j = 0; j < size; j++) {
    uint8Arr[j] = j % 256;
  }

  return new File([uint8Arr], name);
}

/**
 * Read body from downloading operation methods to string.
 * Browser-only version.
 */
export async function bodyToString(
  response: { blobBody?: Promise<Blob> },
  _length?: number,
): Promise<string> {
  const blob = await response.blobBody;
  if (!blob) {
    throw new Error("blobBody is undefined");
  }
  return blob.text();
}
