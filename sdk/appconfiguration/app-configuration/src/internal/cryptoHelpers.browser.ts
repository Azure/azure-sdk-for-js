// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/// <reference lib="dom"/>

/**
 * @internal
 * @ignore
 */
export async function sha256Digest(body: string | undefined): Promise<string> {
  const digest = await self.crypto.subtle.digest("SHA-256", new TextEncoder().encode(body || ""));

  // The conversions here are a bit odd but necessary (see "Unicode strings" in the link below)
  // https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/btoa
  return btoa(String.fromCharCode(...new Uint8Array(digest)));
}

/**
 * @internal
 * @ignore
 */
export async function sha256Hmac(secret: string, stringToSign: string): Promise<string> {
  const key = await self.crypto.subtle.importKey(
    "raw",
    Uint8Array.from(atob(secret), (c) => c.charCodeAt(0)),
    {
      name: "HMAC",
      hash: "SHA-256"
    },
    false,
    ["sign"]
  );

  const sigArray = await self.crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(stringToSign)
  );

  return btoa(String.fromCharCode(...new Uint8Array(sigArray)));
}
