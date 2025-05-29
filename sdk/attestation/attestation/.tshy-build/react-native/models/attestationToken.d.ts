import type { AttestationSigner } from "./attestationSigner.js";
/**
 * Options used to validate attestation tokens.
 *
 * @typeparam issuer - if provided, specifies the expected issuer of the attestation token.
 * @typeparam validateExpirationTime - if true, validate the expiration time in the token.
 * @typeparam validateNotBeforeTime - if true, validate the "not before" time in the token.
 * @typeparam validateToken - if true, validate the token.
 * @typeparam timeValidationSlack - the validation time slack in the time based validations.
 *
 * @remarks
 *
 *  If validateToken, validateNotBeforeTime, or validateExpirationTime are not
 *  provided, they are all assumed to be 'true'.
 *
 */
export interface AttestationTokenValidationOptions {
    /**
     * If true, validate the attestation token, if false, skip validation.
     */
    validateToken?: boolean;
    /**
     * If true, validate the expiration time for the token.
     */
    validateExpirationTime?: boolean;
    /**
     * If true, validate the "not before" time for the token.
     */
    validateNotBeforeTime?: boolean;
    /**
     * If true, validate the issuer of the token.
     */
    validateIssuer?: boolean;
    /**
     * The expected issuer for the {@link AttestationToken}. Only checked if {@link validateIssuer} is set.
     */
    expectedIssuer?: string;
    /**
     * Tolerance time (in seconds) used to accound for clock drift between the local machine
     * and the server creating the token.
     */
    timeValidationSlack?: number;
    /**
     * Validation function which allows developers to provide their own validation
     * functionality for the attestation token. This can be used to perform additional
     * validations for  signing certificate in AttestationSigner.
     *
     * @param token - Attestation Token to validate.
     * @param signer - Signing Certificate which validated the token.
     *
     * @remarks
     *
     * If there is a problem with token validation, the validateAttestationCallback function
     * will return an array of strings indicating the set of problems found in the token.
     *
     * @returns an array of problems in the token, or undefined if there are no problems.
     */
    validateAttestationToken?: (token: AttestationToken, signer?: AttestationSigner) => string[] | undefined;
}
/**
 *
 * An AttestationToken represents an RFC 7515 JSON Web Signature object.
 *
 * It can represent either the token returned by the attestation service,
 * or it can be used to create a token locally which can be used to verify
 * attestation policy changes.
 */
export interface AttestationToken {
    /**
     * Returns the deserialized body of the AttestationToken object.
     *
     * @returns The body of the attestation token as an object.
     */
    getBody(): unknown;
    /**
     * the token to a string.
     *
     * @remarks
     * Serializes the token to a string.
     *
     * @returns The token serialized to a RFC 7515 JSON Web Signature.
     */
    serialize(): string;
    /**
     * Validates the attestation token to verify that it is semantically correct.
     *
     * @param possibleSigners - the set of possible signers for this attestation token.
     * @param options - validation options
     */
    getTokenProblems(possibleSigners?: AttestationSigner[], options?: AttestationTokenValidationOptions): string[];
    /** ********* JSON WEB SIGNATURE (RFC 7515) PROPERTIES */
    /**
     * Returns the algorithm from the header of the JSON Web Signature.
     *
     *  See {@link https://www.rfc-editor.org/rfc/rfc7515.html#section-4.1.1 | RFC 7515 Section 4.1.1})
     *  for details.
     *
     * If the value of algorithm is "none" it indicates that the token is unsecured.
     */
    algorithm: string;
    /**
     *  Json Web Signature Header "kid".
     *   See {@link https://www.rfc-editor.org/rfc/rfc7515.html#section-4.1.4 | RFC 7515 Section 4.1.4})
     *   for details.
     */
    keyId?: string;
    /**
     * Json Web Signature Header "crit".
     *
     *   See {@link https://www.rfc-editor.org/rfc/rfc7515.html#section-4.1.11 | RFC 7515 Section 4.1.11})
     *   for details.
     *
     */
    critical?: boolean;
    /**
     * Json Web Token Header "content type".
     * See {@link https://www.rfc-editor.org/rfc/rfc7515.html#section-4.1.10 | RFC 7515 Section 4.1.10})
     *
     */
    contentType?: string;
    /**
     * Json Web Token Header "key URL".
     *
     * @see {@link https://www.rfc-editor.org/rfc/rfc7515.html#section-4.1.2 | RFC 7515 Section 4.1.2})
     *
     */
    keyUrl?: string;
    /**
     * Json Web Token Header "X509 Url".
     * @see {@link https://www.rfc-editor.org/rfc/rfc7515.html#section-4.1.5 | RFC 7515 Section 4.1.5})
     *
     */
    x509Url?: string;
    /** Json Web Token Header "Typ".
     *
     * @see {@link https://www.rfc-editor.org/rfc/rfc7515.html#section-4.1.9 | RFC 7515 Section 4.1.9})
     *
     */
    type?: string;
    /**
     * Json Web Token Header "x509 thumprint".
     * See {@link https://www.rfc-editor.org/rfc/rfc7515.html#section-4.1.7 | RFC 7515 Section 4.1.7})
     */
    certificateThumbprint?: string;
    /** Json Web Token Header "x509 SHA256 thumprint".
     *
     * See {@link https://www.rfc-editor.org/rfc/rfc7515.html#section-4.1.8 | RFC 7515 Section 4.1.8})
     *
     */
    certificateSha256Thumbprint?: string;
    /** Json Web Token Header "x509 certificate chain".
     *
     * See {@link https://www.rfc-editor.org/rfc/rfc7515.html#section-4.1.6 | RFC 7515 Section 4.1.6})
     *
     */
    certificateChain?: AttestationSigner;
    /** ********* JSON WEB TOKEN (RFC 7519) PROPERTIES */
    /** Issuer of the attestation token.
     * See {@link https://www.rfc-editor.org/rfc/rfc7519.html#section-4.1.6 | RFC 7519 Section 4.1.6})
     *   for details.
     */
    issuer?: string;
    /** Expiration time for the token, from JWT body.
     *
     * See {@link https://www.rfc-editor.org/rfc/rfc7519.html#section-4.1.4 | RFC 7519 Section 4.1.4})
     *   for details.
     */
    expiresOn?: Date;
    /** Issuance time for the token, from JWT body.
     *
     * See {@link https://www.rfc-editor.org/rfc/rfc7519.html#section-4.1.6 | RFC 7519 Section 4.1.6})
     *   for details.
     */
    issuedAt?: Date;
    /**
     * Not Before time for the token, from JWT body.
     *
     * See {@link https://www.rfc-editor.org/rfc/rfc7519.html#section-4.1.5 | RFC 7519 Section 4.1.5})
     *   for details.
     */
    notBefore?: Date;
}
/**
 *
 * An AttestationToken represents an RFC 7515 JSON Web Signature object.
 *
 * It can represent either the token returned by the attestation service,
 * or it can be used to create a token locally which can be used to verify
 * attestation policy changes.
 */
export declare class AttestationTokenImpl implements AttestationToken {
    /**
     * @internal
     *
     * @param token - Attetation token returned by the attestation service.
     */
    constructor(token: string);
    private _token;
    private _headerBytes;
    private _header;
    private _bodyBytes;
    private _body;
    private _jwsVerifier;
    /**
     * Returns the deserialized body of the AttestationToken object.
     *
     * @returns The body of the attestation token as an object.
     */
    getBody(): unknown;
    /**
     * the token to a string.
     *
     * @remarks
     * Serializes the token to a string.
     *
     * @returns The token serialized to a RFC 7515 JSON Web Signature.
     */
    serialize(): string;
    /**
     * Returns the set of problems discovered in the attestation token.
     *
     * @param possibleSigners - the set of possible signers for this attestation token.
     * @param options - validation options
     * @returns an array of string values. If there are no problems, returns an empty array.
     */
    getTokenProblems(possibleSigners?: AttestationSigner[], options?: AttestationTokenValidationOptions): string[];
    private validateIssuer;
    /**
     * Validate the expiration and notbefore time claims in the JSON web token.
     *
     * @param options - Options to be used validating the time properties.
     */
    private validateTimeProperties;
    private certFromSigner;
    private getCandidateSigners;
    /** ********* JSON WEB SIGNATURE (RFC 7515) PROPERTIES */
    /**
     * Returns the algorithm from the header of the JSON Web Signature.
     *
     *  See {@link https://www.rfc-editor.org/rfc/rfc7515.html#section-4.1.1 | RFC 7515 Section 4.1.1})
     *  for details.
     *
     * If the value of algorithm is "none" it indicates that the token is unsecured.
     */
    get algorithm(): string;
    /**
     *  Json Web Signature Header "kid".
     *   See {@link https://www.rfc-editor.org/rfc/rfc7515.html#section-4.1.4 | RFC 7515 Section 4.1.4})
     *   for details.
     */
    get keyId(): string | undefined;
    /**
     * Json Web Signature Header "crit".
     *
     *   See {@link https://www.rfc-editor.org/rfc/rfc7515.html#section-4.1.11 | RFC 7515 Section 4.1.11})
     *   for details.
     *
     */
    get critical(): boolean | undefined;
    /**
     * Json Web Token Header "content type".
     * See {@link https://www.rfc-editor.org/rfc/rfc7515.html#section-4.1.10 | RFC 7515 Section 4.1.10})
     *
     */
    get contentType(): string | undefined;
    /**
     * Json Web Token Header "key URL".
     *
     * @see {@link https://www.rfc-editor.org/rfc/rfc7515.html#section-4.1.2 | RFC 7515 Section 4.1.2})
     *
     */
    get keyUrl(): string | undefined;
    /**
     * Json Web Token Header "X509 Url".
     * @see {@link https://www.rfc-editor.org/rfc/rfc7515.html#section-4.1.5 | RFC 7515 Section 4.1.5})
     *
     */
    get x509Url(): string | undefined;
    /** Json Web Token Header "Typ".
     *
     * @see {@link https://www.rfc-editor.org/rfc/rfc7515.html#section-4.1.9 | RFC 7515 Section 4.1.9})
     *
     */
    get type(): string | undefined;
    /**
     * Json Web Token Header "x509 thumprint".
     * See {@link https://www.rfc-editor.org/rfc/rfc7515.html#section-4.1.7 | RFC 7515 Section 4.1.7})
     */
    get certificateThumbprint(): string | undefined;
    /** Json Web Token Header "x509 SHA256 thumprint".
     *
     * See {@link https://www.rfc-editor.org/rfc/rfc7515.html#section-4.1.8 | RFC 7515 Section 4.1.8})
     *
     */
    get certificateSha256Thumbprint(): string | undefined;
    /** Json Web Token Header "x509 certificate chain".
     *
     * See {@link https://www.rfc-editor.org/rfc/rfc7515.html#section-4.1.6 | RFC 7515 Section 4.1.6})
     *
     */
    get certificateChain(): AttestationSigner | undefined;
    /** ********* JSON WEB TOKEN (RFC 7519) PROPERTIES */
    /** Issuer of the attestation token.
     * See {@link https://www.rfc-editor.org/rfc/rfc7519.html#section-4.1.6 | RFC 7519 Section 4.1.6})
     *   for details.
     */
    get issuer(): string | undefined;
    /** Expiration time for the token, from JWT body.
     *
     * See {@link https://www.rfc-editor.org/rfc/rfc7519.html#section-4.1.4 | RFC 7519 Section 4.1.4})
     *   for details.
     */
    get expiresOn(): Date | undefined;
    /** Issuance time for the token, from JWT body.
     *
     * See {@link https://www.rfc-editor.org/rfc/rfc7519.html#section-4.1.6 | RFC 7519 Section 4.1.6})
     *   for details.
     */
    get issuedAt(): Date | undefined;
    /**
     * Not Before time for the token, from JWT body.
     *
     * See {@link https://www.rfc-editor.org/rfc/rfc7519.html#section-4.1.5 | RFC 7519 Section 4.1.5})
     *   for details.
     */
    get notBefore(): Date | undefined;
    /**
     * Creates a new attestation token from a body and signing key.
     * @param body - stringified body of the body of the token to be created.
     * @param signer - Optional signing key used to sign the newly created token.
     * @returns an {@link AttestationToken | attestation token}
     */
    static create(params: {
        body?: string;
        privateKey?: string;
        certificate?: string;
    }): AttestationToken;
}
//# sourceMappingURL=attestationToken.d.ts.map