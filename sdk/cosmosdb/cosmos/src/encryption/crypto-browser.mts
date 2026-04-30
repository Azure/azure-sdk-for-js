// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

interface SubtleCryptoLike {
  importKey(
    format: string,
    keyData: ArrayBuffer,
    algorithm: { name: string; hash?: { name: string } },
    extractable: boolean,
    keyUsages: string[],
  ): Promise<unknown>;
  sign(
    algorithm: string | { name: string },
    key: unknown,
    data: ArrayBuffer,
  ): Promise<ArrayBuffer>;
  encrypt(
    algorithm: { name: string; iv: ArrayBuffer },
    key: unknown,
    data: ArrayBuffer,
  ): Promise<ArrayBuffer>;
  decrypt(
    algorithm: { name: string; iv: ArrayBuffer },
    key: unknown,
    data: ArrayBuffer,
  ): Promise<ArrayBuffer>;
}

interface CryptoLike {
  readonly subtle: SubtleCryptoLike;
  getRandomValues<T extends ArrayBufferView>(array: T): T;
}

declare const globalThis: {
  crypto: CryptoLike;
};

export async function hmacSha256(key: Uint8Array, data: Uint8Array): Promise<Uint8Array> {
  const cryptoKey = await globalThis.crypto.subtle.importKey(
    "raw",
    key.buffer as ArrayBuffer,
    { name: "HMAC", hash: { name: "SHA-256" } },
    false,
    ["sign"],
  );
  const signature = await globalThis.crypto.subtle.sign("HMAC", cryptoKey, data.buffer as ArrayBuffer);
  return new Uint8Array(signature);
}

export async function aes256CbcEncrypt(
  key: Uint8Array,
  iv: Uint8Array,
  data: Uint8Array,
): Promise<Uint8Array> {
  const cryptoKey = await globalThis.crypto.subtle.importKey(
    "raw",
    key.buffer as ArrayBuffer,
    { name: "AES-CBC" },
    false,
    ["encrypt"],
  );
  const result = await globalThis.crypto.subtle.encrypt(
    { name: "AES-CBC", iv: iv.buffer as ArrayBuffer },
    cryptoKey,
    data.buffer as ArrayBuffer,
  );
  return new Uint8Array(result);
}

export async function aes256CbcDecrypt(
  key: Uint8Array,
  iv: Uint8Array,
  data: Uint8Array,
): Promise<Uint8Array> {
  const cryptoKey = await globalThis.crypto.subtle.importKey(
    "raw",
    key.buffer as ArrayBuffer,
    { name: "AES-CBC" },
    false,
    ["decrypt"],
  );
  const result = await globalThis.crypto.subtle.decrypt(
    { name: "AES-CBC", iv: iv.buffer as ArrayBuffer },
    cryptoKey,
    data.buffer as ArrayBuffer,
  );
  return new Uint8Array(result);
}

export async function generateRandomBytes(length: number): Promise<Uint8Array> {
  const buffer = new Uint8Array(length);
  globalThis.crypto.getRandomValues(buffer);
  return buffer;
}
