// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// React Native's type definitions do not include these Web Crypto / encoding APIs,
// but they are available at runtime in the Hermes engine.
declare global {
  var TextEncoder: new () => { encode(input: string): Uint8Array<ArrayBuffer> };
  var crypto: {
    subtle: {
      importKey(
        format: string,
        keyData: Uint8Array,
        algorithm: { name: string; hash: string },
        extractable: boolean,
        keyUsages: string[],
      ): Promise<unknown>;
      sign(algorithm: string, key: unknown, data: Uint8Array): Promise<ArrayBuffer>;
    };
  };
  function atob(input: string): string;
  function btoa(input: string): string;
}

/**
 * @internal
 */
export async function sha256Hmac(secret: string, stringToSign: string): Promise<string> {
  const key = await globalThis.crypto.subtle.importKey(
    "raw",
    Uint8Array.from(atob(secret), (c) => c.charCodeAt(0)),
    {
      name: "HMAC",
      hash: "SHA-256",
    },
    false,
    ["sign"],
  );

  const sigArray = await globalThis.crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(stringToSign),
  );

  // The conversions here are a bit odd but necessary (see "Unicode strings" in the link below)
  // https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/btoa
  return btoa(String.fromCharCode(...new Uint8Array(sigArray)));
}
