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
 * Converts an attestation input from Uint8Array/Buffer/Blob to Uint8Array.
 *
 * @param input - Input to attestation API.
 * @returns Promise which completes with the input data as a Uint8Array.
 */
export async function Uint8ArrayFromInput(
  input: Uint8Array | Buffer | Blob | undefined
): Promise<Uint8Array | undefined> {
  if (input === undefined) {
    return input;
  }

  // If this is not a Uint8Array, assume it's a blob and retrieve an ArrayBuffer from the blob.
  if ((input as any).byteLength === undefined) {
    return new Uint8Array(await blobToArrayBuffer(input as Blob));
  }

  // We eliminated the 'Blob' case above, so we know this must be either a Buffer or Uint8Array.
  return input as Uint8Array | Buffer;
}
