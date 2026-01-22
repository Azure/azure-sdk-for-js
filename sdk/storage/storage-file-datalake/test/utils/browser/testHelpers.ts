// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Browser-specific test utilities
 */

/**
 * ONLY AVAILABLE IN BROWSER RUNTIME.
 *
 * Read body from downloading operation methods to string.
 * Browser-specific version that handles Blob bodies.
 * Supports both `blobBody` (from blob client) and `contentAsBlob` (from DataLake client).
 *
 * @param response - Convenience layer methods response with downloaded body
 */
export async function bodyToString({
  blobBody,
  contentAsBlob,
}: {
  blobBody?: Promise<Blob>;
  contentAsBlob?: Promise<Blob>;
}): Promise<string> {
  // DataLake file read uses contentAsBlob
  if (contentAsBlob) {
    const blob = await contentAsBlob;
    return blob.text();
  }

  // Blob storage uses blobBody
  if (blobBody) {
    const blob = await blobBody;
    return blob.text();
  }

  throw new Error(
    "Unable to extract body: blobBody or contentAsBlob is required in browser environment",
  );
}

/**
 * Create a File object for browser testing.
 * @param fileName - Name of the file
 * @param byteLength - Size of the file in bytes
 * @returns A File object with random content
 */
export function getBrowserFile(fileName: string, byteLength: number): File {
  const uint8Arr = new Uint8Array(byteLength);
  for (let j = 0; j < byteLength; j++) {
    uint8Arr[j] = Math.floor(Math.random() * 256);
  }
  return new File([uint8Arr], fileName);
}

/**
 * Compare two ArrayBuffers for equality.
 * @param buf1 - First buffer
 * @param buf2 - Second buffer
 * @returns True if buffers are equal
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
