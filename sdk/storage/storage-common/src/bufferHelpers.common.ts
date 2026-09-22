// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Creates a Blob from the given data.
 * Uses an indirect constructor reference to work around React Native's restrictive
 * Blob type definitions (which only accept string | Blob, not ArrayBuffer).
 */
export function createBlobFromData(data: Blob | ArrayBuffer | ArrayBufferView): Blob {
  if (data instanceof Blob) {
    return data;
  }
  // Use indirect constructor to bypass restrictive type definitions in some environments
  const BlobCtor = Blob as { new (parts: unknown[]): Blob };
  if (data instanceof ArrayBuffer) {
    return new BlobCtor([data]);
  } else {
    const ab = data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength);
    return new BlobCtor([ab]);
  }
}
