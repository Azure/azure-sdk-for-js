import type { CertificateContentType } from "./certificatesModels.js";
/**
 * Decodes a Uint8Array into a Base64 string.
 * @internal
 */
export declare function toBase64(bytes: Uint8Array): string;
/**
 * Decodes a Uint8Array into an ASCII string.
 * @internal
 */
export declare function toAscii(bytes: Uint8Array): string;
/**
 * Encodes a JavaScript string into a Uint8Array.
 * @internal
 */
export declare function stringToUint8Array(value: string): Uint8Array;
/**
 * Encodes a Base64 string into a Uint8Array.
 * @internal
 */
export declare function base64ToUint8Array(value: string): Uint8Array;
/**
 * Parses the PFX or ASCII PEM formatted value of the certificate containing both the X.509 certificates and the private key
 * into a Base64 encoded string.
 *
 * @internal
 * @param certificateBytes - The PFX or ASCII PEM formatted value of the certificate containing both the X.509 certificates and the private key
 * @param contentType - "application/x-pem-file", "application/x-pkcs12" or undefined
 */
export declare function parseCertificateBytes(certificateBytes: Uint8Array, contentType: CertificateContentType): string;
//# sourceMappingURL=utils.d.ts.map