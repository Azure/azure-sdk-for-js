// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CertificateContentType } from "./certificatesModels.js";

// React Native's type definitions do not include TextDecoder/TextEncoder,
// but they are available at runtime in the Hermes engine.
// See https://github.com/facebook/react-native/issues/56325
declare global {
  var TextDecoder: (new (label?: string) => { decode(input: Uint8Array): string }) | undefined;
  var TextEncoder: (new () => { encode(input: string): Uint8Array<ArrayBuffer> }) | undefined;
}

/**
 * Decodes a Uint8Array into a Base64 string.
 * @internal
 */
export function toBase64(bytes: Uint8Array): string {
  return btoa(String.fromCharCode.apply(null, bytes as any as number[]));
}

/**
 * Decodes a Uint8Array into an ASCII string.
 * @internal
 */
export function toAscii(bytes: Uint8Array): string {
  return new TextDecoder!("ascii").decode(bytes);
}

/**
 * Encodes a JavaScript string into a Uint8Array.
 * @internal
 */
export function stringToUint8Array(value: string): Uint8Array {
  return new TextEncoder!().encode(value);
}

/**
 * Encodes a Base64 string into a Uint8Array.
 * @internal
 */
export function base64ToUint8Array(value: string): Uint8Array {
  return Uint8Array.from(atob(value), (c) => c.charCodeAt(0));
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
