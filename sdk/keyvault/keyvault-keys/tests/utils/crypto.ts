// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { isNode } from "./recorder";

export function str2ab(str: string): Uint8Array {
  if (isNode) {
    return new Uint8Array(Buffer.from(str));
  } else {
    const bytes = new Uint8Array(str.length);
    for (let i = 0; i < str.length; i++) {
      bytes[i] = str.charCodeAt(i);
    }
    return bytes;
  }
}

export function ab2str(ab: Uint8Array): string {
  if (isNode) {
    return Buffer.from(ab).toString("utf-8");
  } else {
    const decoder = new TextDecoder("utf-8");
    return decoder.decode(ab);
  }
}
