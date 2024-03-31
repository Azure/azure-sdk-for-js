// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/// <reference lib="dom" />

import { encodeBase64, encodeUTF8, encodeUTF8fromBase64 } from "./encodeUtils.browser";

const subtle = (globalThis as any)?.crypto?.subtle as SubtleCrypto;

export const shaHash = async (content: string): Promise<string> => {
  const data = encodeUTF8(content);
  const hash = await subtle.digest("SHA-256", data);
  return encodeBase64(hash);
};

export const shaHMAC = async (secret: string, content: string): Promise<string> => {
  const importParams: HmacImportParams = { name: "HMAC", hash: { name: "SHA-256" } };
  const encodedMessage = encodeUTF8(content);
  const encodedKey = encodeUTF8fromBase64(secret);
  const crypto = subtle;
  const cryptoKey = await crypto.importKey("raw", encodedKey, importParams, false, ["sign"]);
  const signature = await crypto.sign(importParams, cryptoKey, encodedMessage);
  return encodeBase64(signature);
};
