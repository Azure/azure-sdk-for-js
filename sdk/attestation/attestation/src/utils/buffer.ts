// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

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

  if ((input as any).byteLength === undefined) {
    throw TypeError("Blob is unsupported in node.");
  }

  // We've eliminated the 'Blob' case above, so we know this must be either a Buffer or Uint8Array.
  return input as Uint8Array;
}
