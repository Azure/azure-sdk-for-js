// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Decodes a base64url string.
 * Padding is not needed for the recorded tests and is not added.
 *
 * @internal
 */
export function fromBase64url(value: string): string {
  const encoded = value.replace(/-/g, "+").replace(/_/g, "/");
  return Buffer.from(encoded, "base64").toString();
}

/**
 * Encodes a string to base64url.
 *
 * @internal
 */
export function toBase64url(value: string): string {
  return Buffer.from(value)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}
