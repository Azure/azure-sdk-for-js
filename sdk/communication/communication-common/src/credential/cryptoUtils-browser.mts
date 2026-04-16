// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/// <reference lib="dom" />

import { encodeBase64, encodeUTF8, encodeUTF8fromBase64 } from "./encodeUtils-browser.mjs";

const subtleCrypto = globalThis.crypto.subtle;

export const shaHash = async (content: string): Promise<string> => {
  const data = encodeUTF8(content);
  const hash = await subtleCrypto.digest("SHA-256", data);
  return encodeBase64(hash);
};

export const shaHMAC = async (secret: string, content: string): Promise<string> => {
  const importParams: HmacImportParams = { name: "HMAC", hash: { name: "SHA-256" } };
  const encodedMessage = encodeUTF8(content);
  const encodedKey = encodeUTF8fromBase64(secret);
  const cryptoKey = await subtleCrypto.importKey("raw", encodedKey, importParams, false, ["sign"]);
  const signature = await subtleCrypto.sign(importParams, cryptoKey, encodedMessage);
  return encodeBase64(signature);
};
