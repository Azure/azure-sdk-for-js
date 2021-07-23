// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export async function convertToUint8ArrayB(data: Uint8Array | Buffer | Blob): Promise<Uint8Array> {
  const blobP = data as Blob;
  if (blobP) {
    //      const buffer = await blobP.arrayBuffer();
    const fileReader = new FileReader();
    let arrayBuffer: unknown;
    fileReader.onload = function(event: ProgressEvent<FileReader>) {
      arrayBuffer = event.target?.result;
    };
    fileReader.readAsArrayBuffer(blobP);
    return new Uint8Array(arrayBuffer as ArrayBuffer);
  }

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
