// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

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

declare const self: {
  crypto: {
    subtle: {
      importKey(
        format: string,
        keyData: Uint8Array,
        algorithm: HmacImportParams,
        extractable: boolean,
        usages: string[],
      ): Promise<CryptoKey>;
      sign(
        algorithm: string | HmacImportParams,
        key: CryptoKey,
        data: Uint8Array,
      ): Promise<ArrayBuffer>;
    };
  };
};

/**
 * @internal
 */
export async function generateKey(secret: string, stringToSign: string): Promise<string> {
  const key = await self.crypto.subtle.importKey(
    "raw",
    convertToUint8Array(secret),
    {
      name: "HMAC",
      hash: { name: "SHA-256" },
    },
    false,
    ["sign"],
  );

  const signature = await self.crypto.subtle.sign("HMAC", key, convertToUint8Array(stringToSign));
  const base64encodedString = encodeByteArray(new Uint8Array(signature));
  const result = encodeURIComponent(base64encodedString);
  return result;
}

/**
 * @internal
 */
function convertToUint8Array(value: string): Uint8Array {
  const arr = new Uint8Array(value.length);
  for (let i = 0; i < value.length; i++) {
    arr[i] = value.charCodeAt(i);
  }
  return arr;
}

/**
 * Encodes a byte array in base64 format.
 * @param value - the Uint8Array to encode
 * @internal
 *
 */
function encodeByteArray(value: Uint8Array): string {
  let str = "";
  for (let i = 0; i < value.length; i++) {
    str += String.fromCharCode(value[i]);
  }
  return btoa(str);
}
