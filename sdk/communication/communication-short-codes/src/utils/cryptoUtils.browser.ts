// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { encodeUTF8, encodeBase64, encodeUTF8fromBase64 } from "./encodeUtils.browser";

const globalRef: any = globalThis;

const getCrypto = (): SubtleCrypto => {
  if (!globalRef) {
    throw new Error("Could not find global");
  }

  if (!globalRef.crypto || !globalRef.crypto.subtle) {
    throw new Error("Browser does not support cryptography functions");
  }

  return globalRef.crypto.subtle;
};

export const shaHash = async (content: string): Promise<string> => {
  const data = encodeUTF8(content);
  const hash = await getCrypto().digest("SHA-256", data);
  return encodeBase64(hash);
};

export const shaHMAC = async (secret: string, content: string): Promise<string> => {
  const importParams: HmacImportParams = { name: "HMAC", hash: { name: "SHA-256" } };
  const encodedMessage = encodeUTF8(content);
  const encodedKey = encodeUTF8fromBase64(secret);
  const crypto = getCrypto();
  const cryptoKey = await crypto.importKey("raw", encodedKey, importParams, false, ["sign"]);
  const signature = await crypto.sign(importParams, cryptoKey, encodedMessage);
  return encodeBase64(signature);
};
