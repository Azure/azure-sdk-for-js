// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

declare global {
  interface Crypto {
    readonly subtle: SubtleCrypto;
  }
  interface SubtleCrypto {
    digest(algorithm: AlgorithmIdentifier, data: BufferSource): Promise<ArrayBuffer>;
    importKey(
      format: "raw",
      keyData: BufferSource,
      algorithm: AlgorithmIdentifier | HmacImportParams,
      extractable: boolean,
      keyUsages: KeyUsage[],
    ): Promise<CryptoKey>;
    sign(
      algorithm: AlgorithmIdentifier | HmacImportParams,
      key: CryptoKey,
      data: BufferSource,
    ): Promise<ArrayBuffer>;
  }
  interface HmacImportParams {
    name: string;
    hash: AlgorithmIdentifier;
  }
  interface CryptoKey {}
  type AlgorithmIdentifier = string | { name: string };
  type KeyUsage = "sign" | "verify" | "encrypt" | "decrypt";
  var crypto: Crypto;
}

const globalCrypto: Crypto = globalThis.crypto;

if (!globalCrypto || !globalCrypto.subtle) {
  throw new Error("Browser does not support cryptography functions");
}

export { globalCrypto };
