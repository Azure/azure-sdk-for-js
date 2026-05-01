// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// React Native has crypto.subtle available but doesn't ship DOM lib types.
declare const globalThis: {
  crypto: {
    subtle: {
      importKey(
        format: string,
        keyData: Uint8Array<ArrayBuffer>,
        algorithm: { name: string; hash?: { name: string } },
        extractable: boolean,
        keyUsages: string[],
      ): Promise<unknown>;
      sign(algorithm: string, key: unknown, data: Uint8Array<ArrayBuffer>): Promise<ArrayBuffer>;
      encrypt(
        algorithm: { name: string; iv: Uint8Array<ArrayBuffer> },
        key: unknown,
        data: Uint8Array<ArrayBuffer>,
      ): Promise<ArrayBuffer>;
      decrypt(
        algorithm: { name: string; iv: Uint8Array<ArrayBuffer> },
        key: unknown,
        data: Uint8Array<ArrayBuffer>,
      ): Promise<ArrayBuffer>;
    };
    getRandomValues<T extends ArrayBufferView>(array: T): T;
  };
};

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
