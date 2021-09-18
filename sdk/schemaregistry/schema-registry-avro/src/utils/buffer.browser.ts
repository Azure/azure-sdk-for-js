// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

async function blobToArrayBuffer(blob: Blob): Promise<ArrayBuffer> {
  if ("arrayBuffer" in blob) {
    return blob.arrayBuffer();
  }
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as ArrayBuffer);
    reader.onerror = () => reject;
    reader.readAsArrayBuffer(blob);
  });
}

/**
 * @param input - Input to `deserialize`.
 * @returns Promise which completes with the input data as a Uint8Array.
 */
export async function toUint8Array(input: Uint8Array | Buffer | Blob): Promise<Uint8Array> {
  // If this is not a Uint8Array, assume it's a blob and retrieve an ArrayBuffer from the blob.
  if ((input as any).byteLength === undefined) {
    return new Uint8Array(await blobToArrayBuffer(input as Blob));
  }
  return input as Uint8Array;
}
