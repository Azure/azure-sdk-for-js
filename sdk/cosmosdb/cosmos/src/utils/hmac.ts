// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { encodeUTF8, encodeBase64 } from "./encode.js";

export async function hmac(key: string, message: string): Promise<string> {
  const importParams = { name: "HMAC", hash: { name: "SHA-256" } };
  const encodedMessage = new Uint8Array(
    [...unescape(encodeURIComponent(message))].map((c) => c.charCodeAt(0)),
  );
  const encodedKey = encodeUTF8(globalThis.atob(key));
  const subtle = (globalThis as any).crypto.subtle;
  const cryptoKey = await subtle.importKey("raw", encodedKey, importParams, false, ["sign"]);
  const signature = await subtle.sign(importParams, cryptoKey, encodedMessage);

  return encodeBase64(signature);
}
