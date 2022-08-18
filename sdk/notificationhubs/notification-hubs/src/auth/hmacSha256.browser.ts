// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// stubs for browser self.crypto
interface JsonWebKey {}

interface CryptoKey {}

type KeyUsage =
  | "decrypt"
  | "deriveBits"
  | "deriveKey"
  | "encrypt"
  | "sign"
  | "unwrapKey"
  | "verify"
  | "wrapKey";

interface Algorithm {
  name: string;
}

interface SubtleCrypto {
  importKey(
    format: string,
    keyData: JsonWebKey,
    algorithm: HmacImportParams,
    extractable: boolean,
    usage: KeyUsage[]
  ): Promise<CryptoKey>;
  sign(
    algorithm: HmacImportParams,
    key: CryptoKey,
    data: ArrayBufferView | ArrayBuffer
  ): Promise<ArrayBuffer>;
  digest(algorithm: Algorithm, data: ArrayBufferView | ArrayBuffer): Promise<ArrayBuffer>;
}

interface Crypto {
  readonly subtle: SubtleCrypto;
  getRandomValues<T extends ArrayBufferView | null>(array: T): T;
}

declare const self: {
  crypto: Crypto;
};

interface HmacImportParams {
  name: string;
  hash: Algorithm;
  length?: number;
}

// stubs for browser TextEncoder
interface TextEncoder {
  encode(input?: string): Uint8Array;
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
declare const TextEncoder: {
  prototype: TextEncoder;
  new (): TextEncoder;
};

declare function btoa(str: string | Buffer): string;

export async function signString(key: string, toSign: string): Promise<string> {
  const enc = new TextEncoder();
  const algorithm: HmacImportParams = { name: "HMAC", hash: { name: "SHA-256" } };

  const extractedKey = await self.crypto.subtle.importKey(
    "raw",
    enc.encode(key),
    algorithm,
    false,
    ["sign", "verify"]
  );
  const signature = await self.crypto.subtle.sign(algorithm, extractedKey, enc.encode(toSign));
  const digest = btoa(String.fromCharCode(...new Uint8Array(signature)));

  return digest;
}
