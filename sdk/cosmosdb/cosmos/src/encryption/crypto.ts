// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Cross-platform crypto utilities using Web Crypto API.
 * Works in Node.js 20+, browsers, and React Native (with polyfill).
 */

// Local type declarations for environments without DOM lib (React Native).
// Using `declare const` shadows globalThis locally without conflicting with DOM types.
declare const globalThis: {
  crypto: {
    subtle: {
      importKey(
        format: string,
        keyData: Uint8Array<ArrayBuffer>,
        algorithm: { name: string; hash?: { name: string } },
        extractable: boolean,
        keyUsages: string[],
      ): Promise<CryptoKey>;
      sign(algorithm: string, key: CryptoKey, data: Uint8Array<ArrayBuffer>): Promise<ArrayBuffer>;
      encrypt(
        algorithm: { name: string; iv: Uint8Array<ArrayBuffer> },
        key: CryptoKey,
        data: Uint8Array<ArrayBuffer>,
      ): Promise<ArrayBuffer>;
      decrypt(
        algorithm: { name: string; iv: Uint8Array<ArrayBuffer> },
        key: CryptoKey,
        data: Uint8Array<ArrayBuffer>,
      ): Promise<ArrayBuffer>;
    };
    getRandomValues<T extends ArrayBufferView>(array: T): T;
  };
};

// Minimal CryptoKey interface for typing
interface CryptoKey {
  readonly type: string;
}

export async function hmacSha256(
  key: Uint8Array<ArrayBuffer>,
  data: Uint8Array<ArrayBuffer>,
): Promise<Uint8Array<ArrayBuffer>> {
  const cryptoKey = await globalThis.crypto.subtle.importKey(
    "raw",
    key,
    { name: "HMAC", hash: { name: "SHA-256" } },
    false,
    ["sign"],
  );
  const signature = await globalThis.crypto.subtle.sign("HMAC", cryptoKey, data);
  return new Uint8Array(signature);
}

export async function aes256CbcEncrypt(
  key: Uint8Array<ArrayBuffer>,
  iv: Uint8Array<ArrayBuffer>,
  data: Uint8Array<ArrayBuffer>,
): Promise<Uint8Array<ArrayBuffer>> {
  const cryptoKey = await globalThis.crypto.subtle.importKey(
    "raw",
    key,
    { name: "AES-CBC" },
    false,
    ["encrypt"],
  );
  const result = await globalThis.crypto.subtle.encrypt({ name: "AES-CBC", iv }, cryptoKey, data);
  return new Uint8Array(result);
}

export async function aes256CbcDecrypt(
  key: Uint8Array<ArrayBuffer>,
  iv: Uint8Array<ArrayBuffer>,
  data: Uint8Array<ArrayBuffer>,
): Promise<Uint8Array<ArrayBuffer>> {
  const cryptoKey = await globalThis.crypto.subtle.importKey(
    "raw",
    key,
    { name: "AES-CBC" },
    false,
    ["decrypt"],
  );
  const result = await globalThis.crypto.subtle.decrypt({ name: "AES-CBC", iv }, cryptoKey, data);
  return new Uint8Array(result);
}

export async function generateRandomBytes(length: number): Promise<Uint8Array<ArrayBuffer>> {
  const buffer = new Uint8Array(length);
  globalThis.crypto.getRandomValues(buffer);
  return buffer;
}
