// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @param input - Input to `deserialize`.
 * @returns Promise which completes with the input data as a Uint8Array.
 */
export async function toUint8Array(input: Uint8Array | Buffer | Blob): Promise<Uint8Array> {
  if ((input as any).byteLength === undefined) {
    throw TypeError("Blob is unsupported in node.");
  }
  return input as Uint8Array;
}
