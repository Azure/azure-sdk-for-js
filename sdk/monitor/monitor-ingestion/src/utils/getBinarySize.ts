// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
export function getBinarySize(
  text: string | ArrayBuffer | NodeJS.ArrayBufferView | SharedArrayBuffer,
): number {
  return Buffer.byteLength(text, "utf8");
}
