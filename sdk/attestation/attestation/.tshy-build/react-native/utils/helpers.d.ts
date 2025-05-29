/** Create an AttestationSigningKey from the provided private key and certificate.
 *
 * @param privateKey - PEM encoded DER Encoded RSA or ECDS key.
 * @param certificate - PEM encoded DER encoded X.509 certificate.
 */
export declare function verifyAttestationSigningKey(privateKey: string, certificate: string): {
    certificate: string;
    privateKey: string;
};
export type PemType = "CERTIFICATE" | "PRIVATE KEY";
/**
 *
 * @param base64 - Base64 encoded DER object to encode as PEM.
 * @param pemType - PEM object type - typically "CERTIFICATE" |
 */
export declare function pemFromBase64(base64: string, pemType: PemType): string;
/**
 * Converts a hex encoded string to its base64 equivalent.
 * @param value - Hex encoded value
 */
export declare function hexToBase64(value: string): string;
//# sourceMappingURL=helpers.d.ts.map