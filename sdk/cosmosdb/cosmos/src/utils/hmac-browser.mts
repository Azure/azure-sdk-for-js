// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { encodeUTF8, encodeBase64 } from "./encode.js";

export async function hmac(key: string, message: string): Promise<string> {
  const importParams: HmacImportParams = { name: "HMAC", hash: { name: "SHA-256" } };
  const encodedMessage = new TextEncoder().encode(message);
  const encodedKey = encodeUTF8(globalThis.atob(key));
  const cryptoKey = await globalThis.crypto.subtle.importKey(
    "raw",
    encodedKey,
    importParams,
    false,
    ["sign"],
  );
  const signature = await globalThis.crypto.subtle.sign(importParams, cryptoKey, encodedMessage);

  return encodeBase64(signature);
}
