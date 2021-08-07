// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export function fromBase64url(value: string): string {
  const encoded = value.replace(/-/g, "+").replace(/_/g, "/");
  // Skipped calculating padding as it's not necessary for the test recording.
  return Buffer.from(encoded, "base64").toString();
}

export function toBase64url(value: string): string {
  return Buffer.from(value)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}
