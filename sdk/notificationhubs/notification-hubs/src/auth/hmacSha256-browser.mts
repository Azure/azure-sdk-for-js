// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

declare global {
  interface HmacImportParams {
    name: string;
    hash: { name: string };
  }

  interface CryptoKey {
    algorithm: HmacImportParams;
    type: string;
    extractable: boolean;
    usages: string[];
  }

  function btoa(input: string): string;
}

declare const globalThis: {
  crypto: {
    subtle: {
      importKey(
        format: string,
        keyData: Uint8Array,
        algorithm: HmacImportParams,
        extractable: boolean,
        usages: string[],
      ): Promise<CryptoKey>;
      sign(algorithm: HmacImportParams, key: CryptoKey, data: Uint8Array): Promise<ArrayBuffer>;
    };
  };
};

export async function signString(key: string, toSign: string): Promise<string> {
  const enc = new TextEncoder();
  const algorithm: HmacImportParams = { name: "HMAC", hash: { name: "SHA-256" } };

  const extractedKey = await globalThis.crypto.subtle.importKey(
    "raw",
    enc.encode(key),
    algorithm,
    false,
    ["sign", "verify"],
  );
  const signature = await globalThis.crypto.subtle.sign(
    algorithm,
    extractedKey,
    enc.encode(toSign),
  );
  const digest = btoa(String.fromCharCode(...new Uint8Array(signature)));

  return encodeURIComponent(digest);
}
