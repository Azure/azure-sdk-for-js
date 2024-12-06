// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { encodeUTF8 } from "./encode.js";
import { globalCrypto } from "./globalCrypto.js";

export async function digest(str: string): Promise<string> {
  const data = encodeUTF8(str);
  const hash = await globalCrypto.subtle.digest("SHA-256", data);
  return bufferToHex(hash);
}

function bufferToHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((item) => item.toString(16).padStart(2, "0"))
    .join("");
}
