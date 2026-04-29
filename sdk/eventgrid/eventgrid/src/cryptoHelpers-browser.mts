// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/// <reference lib="dom"/>

import { stringToUint8Array, uint8ArrayToString } from "@azure/core-util";

/**
 * @internal
 */
export async function sha256Hmac(secret: string, stringToSign: string): Promise<string> {
  const secretBytes = stringToUint8Array(secret, "base64");
  const dataBytes = stringToUint8Array(stringToSign, "utf-8");

  const key = await globalThis.crypto.subtle.importKey(
    "raw",
    new Uint8Array(secretBytes),
    {
      name: "HMAC",
      hash: "SHA-256",
    },
    false,
    ["sign"],
  );

  const sigArray = await globalThis.crypto.subtle.sign("HMAC", key, new Uint8Array(dataBytes));

  return uint8ArrayToString(new Uint8Array(sigArray), "base64");
}
