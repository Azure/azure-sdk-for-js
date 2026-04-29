// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { encodeBase64, encodeUTF8, encodeUTF8fromBase64 } from "./encodeUtils-react-native.mjs";

interface HmacImportParams {
  name: string;
  hash: { name: string };
}

interface CryptoKey {}

interface SubtleCrypto {
  digest(algorithm: string, data: Uint8Array): Promise<ArrayBuffer>;
  importKey(
    format: string,
    keyData: Uint8Array,
    algorithm: HmacImportParams,
    extractable: boolean,
    keyUsages: string[],
  ): Promise<CryptoKey>;
  sign(algorithm: HmacImportParams, key: CryptoKey, data: Uint8Array): Promise<ArrayBuffer>;
}

declare const crypto: { subtle: SubtleCrypto };

const subtleCrypto = crypto.subtle;

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
