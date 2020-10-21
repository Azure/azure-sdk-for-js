// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// d.ts shims provide types for things we use internally but are not part
// of this package's surface area.

declare function atob(data: string): string;
declare function btoa(data: string): string;

interface SubtleCrypto {
  importKey: (
    format: string,
    keyData: ArrayBuffer,
    algo: HmacImportParams,
    extractable: boolean,
    usages: string[]
  ) => Promise<CryptoKey>;

  sign: (
    algo: HmacImportParams,
    key: CryptoKey,
    encodedMessage: ArrayBuffer
  ) => Promise<ArrayBuffer>;

  digest: (algo: string, data: ArrayBuffer) => Promise<ArrayBuffer>;
}

interface HmacImportParams {}

interface CryptoKey {}

declare class TextEncoder {
  encode(str: string): Uint8Array;
}
