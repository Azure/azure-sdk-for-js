// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createCipheriv, createDecipheriv, createHmac, randomBytes } from "node:crypto";

export function hmacSha256(key: Uint8Array, data: Uint8Array): Promise<Uint8Array> {
  const hmac = createHmac("sha256", key);
  hmac.update(data);
  return Promise.resolve(hmac.digest());
}

export function aes256CbcEncrypt(
  key: Uint8Array,
  iv: Uint8Array,
  data: Uint8Array,
): Promise<Uint8Array> {
  const cipher = createCipheriv("aes-256-cbc", key, iv);
  const result = Buffer.concat([cipher.update(data), cipher.final()]);
  return Promise.resolve(result);
}

export function aes256CbcDecrypt(
  key: Uint8Array,
  iv: Uint8Array,
  data: Uint8Array,
): Promise<Uint8Array> {
  const decipher = createDecipheriv("aes-256-cbc", key, iv);
  const result = Buffer.concat([decipher.update(data), decipher.final()]);
  return Promise.resolve(result);
}

export function generateRandomBytes(length: number): Promise<Uint8Array> {
  return Promise.resolve(randomBytes(length));
}
