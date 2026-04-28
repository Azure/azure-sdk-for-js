// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CertificateContentType } from "./certificatesModels.js";

/**
 * Decodes a Uint8Array into a Base64 string.
 * @internal
 */
export function toBase64(bytes: Uint8Array): string {
  return Buffer.from(bytes).toString("base64");
}

/**
 * Decodes a Uint8Array into an ASCII string.
 * @internal
 */
export function toAscii(bytes: Uint8Array): string {
  return Buffer.from(bytes).toString("ascii");
}

/**
 * Encodes a JavaScript string into a Uint8Array.
 * @internal
 */
export function stringToUint8Array(value: string): Uint8Array {
  return Buffer.from(value);
}

/**
 * Encodes a Base64 string into a Uint8Array.
 * @internal
 */
export function base64ToUint8Array(value: string): Uint8Array {
  return Buffer.from(value, "base64");
}

/**
 * Parses the PFX or ASCII PEM formatted value of the certificate containing both the X.509 certificates and the private key
 * into a Base64 encoded string.
 *
 * @internal
 * @param certificateBytes - The PFX or ASCII PEM formatted value of the certificate containing both the X.509 certificates and the private key
 * @param contentType - "application/x-pem-file", "application/x-pkcs12" or undefined
 */
export function parseCertificateBytes(
  certificateBytes: Uint8Array,
  contentType: CertificateContentType,
): string {
  if (contentType === "application/x-pem-file") {
    return toAscii(certificateBytes);
  } else {
    return toBase64(certificateBytes);
  }
}
