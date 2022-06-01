// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { isNode } from "@azure/core-http";
import { CertificateContentType } from "./certificatesModels";

/**
 * Decodes a Uint8Array into a Base64 string.
 * @internal
 */
export function toBase64(bytes: Uint8Array): string {
  if (isNode) {
    return Buffer.from(bytes).toString("base64");
  } else {
    return btoa(String.fromCharCode.apply(null, bytes as any as number[]));
  }
}

/**
 * Decodes a Uint8Array into an ASCII string.
 * @internal
 */
export function toAscii(bytes: Uint8Array): string {
  if (isNode) {
    return Buffer.from(bytes).toString("ascii");
  } else {
    return new TextDecoder("ascii").decode(bytes);
  }
}

/**
 * Encodes a JavaScript string into a Uint8Array.
 * @internal
 */
export function stringToUint8Array(value: string): Uint8Array {
  if (isNode) {
    return Buffer.from(value);
  } else {
    return new TextEncoder().encode(value);
  }
}

/**
 * Encodes a Base64 string into a Uint8Array.
 * @internal
 */
export function base64ToUint8Array(value: string): Uint8Array {
  if (isNode) {
    return Buffer.from(value, "base64");
  } else {
    return Uint8Array.from(atob(value), (c) => c.charCodeAt(0));
  }
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
  contentType: CertificateContentType
): string {
  if (contentType === "application/x-pem-file") {
    // PEM files have the certificate bytes already Base64 formatted.
    return toAscii(certificateBytes);
  } else {
    return toBase64(certificateBytes);
  }
}
