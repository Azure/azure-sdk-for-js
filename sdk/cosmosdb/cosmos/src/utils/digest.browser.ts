// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { encodeUTF8 } from "./encode";
import { globalCrypto } from "./globalCrypto";

export async function digest(str: string) {
  const data = encodeUTF8(str);
  const hash = await globalCrypto.subtle.digest("SHA-256", data);
  return bufferToHex(hash);
}

function bufferToHex(buffer: ArrayBuffer) {
  return Array.prototype.map
    .call(new Uint8Array(buffer), (item: number) => ("00" + item.toString(16)).slice(-2))
    .join("");
}
