// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @param input - Input to `deserialize`.
 * @returns Promise which completes with the input data as a Uint8Array.
 */
export async function blobToUint8Array(_input: Blob): Promise<Uint8Array> {
  throw TypeError("Blob is unsupported in node.");
}
