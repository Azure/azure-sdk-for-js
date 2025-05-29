import type { JsonWebKey } from "../generated/models/index.js";
/**
 * An AttestationSigner represents a signing certificate chain/Key ID combination
 * returned by the attestation service.
 */
export interface AttestationSigner {
    /**
     * The Key ID for the signer, as defined by the "kid" parameter in
     * {@link https://datatracker.ietf.org/doc/html/rfc7517#section-4.5 | RFC 7517 section 4.5}
     */
    keyId?: string;
    /**
     * An array of X.509 certificates DER encoded and PEM encoded one of which
     * will be used to sign an attestation token. Also the "x5c" parameter in
     * {@link https://datatracker.ietf.org/doc/html/rfc7517#section-4.7 | RFC 7517 section 4.7}
     */
    certificates: string[];
}
/**
 *
 * @param key  - JsonWebKey for signing key.
 * @returns AttestationSigner created from the JsonWebKey.
 *
 * @internal
 */
export declare function _attestationSignerFromGenerated(key?: JsonWebKey): AttestationSigner;
//# sourceMappingURL=attestationSigner.d.ts.map