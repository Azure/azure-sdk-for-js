// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Type declarations for Web Crypto API in React Native builds.
 * React Native doesn't have DOM types, so we provide minimal crypto types here.
 * This file is included only in the RN tsconfig via the include array.
 */

declare global {
  interface CryptoKey {
    readonly type: string;
  }

  var crypto: {
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
}

export {};
