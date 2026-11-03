// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { uint8ArrayToString, stringToUint8Array as coreStringToUint8Array } from "@azure/core-util";
import type { CertificateContentType } from "./certificatesModels.js";

/**
 * Decodes a Uint8Array into a Base64 string.
 * @internal
 */
export function toBase64(bytes: Uint8Array): string {
  return uint8ArrayToString(bytes, "base64");
}

/**
 * Decodes a Uint8Array into a UTF-8 string.
 * @internal
 */
export function toUtf8(bytes: Uint8Array): string {
  return uint8ArrayToString(bytes, "utf-8");
}

/**
 * Encodes a JavaScript string into a Uint8Array.
 * @internal
 */
export function stringToUint8Array(value: string): Uint8Array {
  return coreStringToUint8Array(value, "utf-8");
}

/**
 * Encodes a Base64 string into a Uint8Array.
 * @internal
 */
export function base64ToUint8Array(value: string): Uint8Array {
  return coreStringToUint8Array(value, "base64");
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
    return toUtf8(certificateBytes);
  } else {
    return toBase64(certificateBytes);
  }
}
