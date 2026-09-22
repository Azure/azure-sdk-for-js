// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { uint8ArrayToString } from "@azure/core-util";

export async function signString(key: string, toSign: string): Promise<string> {
  const enc = new TextEncoder();
  const algorithm = { name: "HMAC", hash: { name: "SHA-256" } };

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
  const digest = uint8ArrayToString(new Uint8Array(signature), "base64");

  return encodeURIComponent(digest);
}
