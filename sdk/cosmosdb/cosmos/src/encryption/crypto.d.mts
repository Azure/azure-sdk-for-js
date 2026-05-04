// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Type declarations for Web Crypto API in environments without DOM lib (React Native).
 * This file is automatically included by TypeScript for modules importing crypto.ts.
 */

interface CryptoKey {
  readonly type: string;
}

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

export {};
