// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Converts an attestation input from Uint8Array/Buffer/Blob to Uint8Array.
 * 
 * @param input - Input to attestation API.
 * @returns Promise which completes with the input data as a Uint8Array.
 */
 export function Uint8ArrayFromInput(input : Uint8Array | Buffer | Blob) : Uint8Array {

  if ((input as any).byteLength === undefined) {
    const fileReader = new FileReader();
    let arrayBuffer : ArrayBuffer | null = null;
    fileReader.onload = (ev: any) => {
      arrayBuffer = ev.target!.result;
    };
    fileReader.readAsArrayBuffer(input as Blob);
    if (arrayBuffer === null) {
      throw new Error("Could not convert Blob to buffer.");
    }
    return new Uint8Array(arrayBuffer);
  }

    // We've eliminated the 'Blob' case above, so we know this must be either a Buffer or Uint8Array.
    input = input as Uint8Array | Buffer;
    return input;
}
