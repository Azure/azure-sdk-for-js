// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Convert a data blob into a UInt8 array.
 * @param data -
 * @returns
 */
export async function convertToUint8ArrayN(data: Uint8Array | Buffer): Promise<Uint8Array> {
  const bufferP = data as Buffer;
  if (bufferP) {
    return bufferP;
  }

  const arrayP = data as Uint8Array;
  if (arrayP) {
    return arrayP;
  }
  throw Error("Cannot reach this statement.");
}
