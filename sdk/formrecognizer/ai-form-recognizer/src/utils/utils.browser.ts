// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/no-empty-function
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
