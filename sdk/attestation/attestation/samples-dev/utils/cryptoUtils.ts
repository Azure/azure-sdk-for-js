// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @azsdk-util true
 */

import forge from "node-forge";
import { stringToUint8Array, uint8ArrayToString } from "@azure/core-util";

function binaryStringToBytes(value: string): Uint8Array {
  return Uint8Array.from(value, (character) => character.charCodeAt(0));
}

export function certificateToDer(certificate: string): Uint8Array {
  const base64 = certificate
    .replace("-----BEGIN CERTIFICATE-----", "")
    .replace("-----END CERTIFICATE-----", "")
    .replace(/\s/g, "");
  const der = stringToUint8Array(base64, "base64");
  if (uint8ArrayToString(der, "base64") !== base64) {
    throw new Error("Invalid PEM encoded certificate.");
  }
  return der;
}

/**
 * Generate the SHA256 hash of the specified buffer.
 */
export function generateSha256Hash(buffer: string): Uint8Array {
  const digest = forge.md.sha256.create();
  digest.update(buffer, "utf8");
  return binaryStringToBytes(digest.digest().getBytes());
}

/** Generate the SHA1 hash of the specified buffer.
 *
 * @param buffer - Buffer to be hashed.
 * @returns SHA1 hash of the buffer.
 */
export function generateSha1Hash(buffer: Uint8Array): Uint8Array {
  const digest = forge.md.sha1.create();
  digest.update(String.fromCharCode(...buffer), "raw");
  return binaryStringToBytes(digest.digest().getBytes());
}
