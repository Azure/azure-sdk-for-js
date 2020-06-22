// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @internal
 * @ignore
 */
export async function sha256Digest(body: any): Promise<string> {
  const digest = await window.crypto.subtle.digest("SHA-256", new TextEncoder().encode(body || ""));

  return btoa(String.fromCharCode(...new Uint8Array(digest)));
}

/**
 * @internal
 * @ignore
 */
export async function sha256Hmac(secret: string, stringToSign: string): Promise<string> {
  const key = await window.crypto.subtle.importKey(
    "raw",
    Uint8Array.from(atob(secret), (c) => c.charCodeAt(0)),
    {
      name: "HMAC",
      hash: "SHA-256"
    },
    false,
    ["sign"]
  );

  const sigArray = await window.crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(stringToSign)
  );

  return btoa(String.fromCharCode(...new Uint8Array(sigArray)));
}
