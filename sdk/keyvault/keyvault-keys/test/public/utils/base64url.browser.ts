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
  return atob(encoded);
}

/**
 * Encodes a string to base64url.
 *
 * @internal
 */
export function toBase64url(value: string): string {
  return btoa(value).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
