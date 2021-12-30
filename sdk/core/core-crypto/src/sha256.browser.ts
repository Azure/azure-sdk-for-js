// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/// <reference lib="dom" />

import { base64ToBytes, bufferToBase64 } from "./utils/base64.browser";
import { bufferToHex } from "./utils/hex";
import { utf8ToBytes } from "./utils/utf8.browser";

let subtleCrypto: SubtleCrypto | undefined;

/**
 * Returns a cached reference to the Web API crypto.subtle object.
 * @internal
 */
function getCrypto(): SubtleCrypto {
  if (subtleCrypto) {
    return subtleCrypto;
  }

  if (!self.crypto || !self.crypto.subtle) {
    throw new Error("Your browser environment does not support cryptography functions.");
  }

  subtleCrypto = self.crypto.subtle;
  return subtleCrypto;
}

const importParams: HmacImportParams = {
  name: "HMAC",
  hash: { name: "SHA-256" },
};

/**
 * Generates a SHA-256 HMAC signature.
 * @param key - The HMAC key represented as a base64 string, used to generate the cryptographic HMAC hash.
 * @param stringToSign - The data to be signed.
 * @param encoding - The textual encoding to use for the returned HMAC digest.
 */
export async function computeSha256Hmac(
  key: string,
  stringToSign: string,
  encoding: "base64" | "hex"
): Promise<string> {
  const crypto = getCrypto();
  const keyBytes = base64ToBytes(key);
  const stringToSignBytes = utf8ToBytes(stringToSign);

  const cryptoKey = await crypto.importKey("raw", keyBytes, importParams, false, ["sign"]);
  const signature = await crypto.sign(importParams, cryptoKey, stringToSignBytes);

  switch (encoding) {
    case "base64":
      return bufferToBase64(signature);
    case "hex":
      return bufferToHex(signature);
  }
}

/**
 * Generates a SHA-256 hash.
 * @param content - The data to be included in the hash.
 * @param encoding - The textual encoding to use for the returned hash.
 */
export async function computeSha256Hash(
  content: string,
  encoding: "base64" | "hex"
): Promise<string> {
  const contentBytes = utf8ToBytes(content);
  const digest = await getCrypto().digest({ name: "SHA-256" }, contentBytes);

  switch (encoding) {
    case "base64":
      return bufferToBase64(digest);
    case "hex":
      return bufferToHex(digest);
  }
}
