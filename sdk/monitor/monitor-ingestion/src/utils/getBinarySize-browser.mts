// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
export function getBinarySize(
  text: string | ArrayBuffer | ArrayBufferView | SharedArrayBuffer,
): number {
  return new Blob([text as BlobPart]).size;
}
