// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Convert a Browser Blob object into ArrayBuffer.
 *
 * @param blob -
 */
export async function blobToArrayBuffer(blob: Blob): Promise<ArrayBuffer> {
  const fileReader = new FileReader();
  return new Promise<ArrayBuffer>((resolve, reject) => {
    fileReader.onloadend = (ev: any) => {
      resolve(ev.target!.result);
    };
    fileReader.onerror = reject;
    fileReader.readAsArrayBuffer(blob);
  });
}

export function streamToBuffer(): void {
  /* empty */
}

export function readStreamToLocalFile(): void {
  /* empty */
}

export const fsStat = function stat(): void {
  /* empty */
};

export const fsCreateReadStream = function createReadStream(): void {
  /* empty */
};
