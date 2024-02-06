// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
export function getBinarySize(
  text: string | ArrayBuffer | NodeJS.ArrayBufferView | SharedArrayBuffer,
): number {
  return Buffer.byteLength(text, "utf8");
}
