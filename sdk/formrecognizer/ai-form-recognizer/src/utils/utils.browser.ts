// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export function streamToBuffer() {}

export async function getFirstFourBytesFromBlob(data: Blob): Promise<Uint8Array> {
  const arrayPromise = new Promise<ArrayBuffer>(function(resolve) {
    const reader = new FileReader();

    reader.onloadend = function() {
      resolve(reader.result as ArrayBuffer);
    };

    reader.readAsArrayBuffer(data);
  });

  const buffer = await arrayPromise;
  if (buffer.byteLength < 4) {
    throw new RangeError("Invalid input. Expect more than 4 bytes of data");
  }

  return new Uint8Array(buffer, 0, 4);
}
