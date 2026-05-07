// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { uint8ArrayToString } from "@azure/core-util";

/**
 * @internal
 */
export async function generateKey(secret: string, stringToSign: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await globalThis.crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: { name: "SHA-256" } },
    false,
    ["sign"],
  );

  const signature = await globalThis.crypto.subtle.sign("HMAC", key, enc.encode(stringToSign));
  const base64encodedString = uint8ArrayToString(new Uint8Array(signature), "base64");
  const result = encodeURIComponent(base64encodedString);
  return result;
}
