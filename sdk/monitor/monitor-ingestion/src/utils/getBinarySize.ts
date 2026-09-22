// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { stringToUint8Array } from "@azure/core-util";

export function getBinarySize(
  text: string | ArrayBuffer | ArrayBufferView | SharedArrayBuffer,
): number {
  if (typeof text === "string") {
    return stringToUint8Array(text, "utf-8").byteLength;
  }
  return text.byteLength;
}
