// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

declare global {
  var self: { crypto?: Crypto; msCrypto?: Crypto } | undefined;
  // eslint-disable-next-line @azure/azure-sdk/ts-no-window
  var window: { crypto?: Crypto; msCrypto?: Crypto } | undefined;
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
}

// eslint-disable-next-line @azure/azure-sdk/ts-no-window
const globalRef: any = typeof self === "undefined" ? window : self;

if (!globalRef) {
  throw new Error("Could not find global");
}

const globalCrypto: Crypto = globalRef.crypto || globalRef.msCrypto;

if (!globalCrypto || !globalCrypto.subtle) {
  throw new Error("Browser does not support cryptography functions");
}

export { globalCrypto };
