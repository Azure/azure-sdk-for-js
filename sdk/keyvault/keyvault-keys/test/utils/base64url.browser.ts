// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export function fromBase64url(value: string): string {
  const encoded = value.replace(/-/g, "+").replace(/_/g, "/");
  return atob(encoded);
}

export function toBase64url(value: string): string {
  return btoa(value)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/\=+$/, "");
}
