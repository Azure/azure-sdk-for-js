// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../jsrsasign.d.ts"/>
import * as jsrsasign from "jsrsasign";
import { base64UrlDecodeString } from "../utils/base64.js";
import { bytesToString } from "../utils/utf8.js";
import { _attestationSignerFromGenerated } from "./attestationSigner.js";
import * as Mappers from "../generated/models/mappers.js";
import { TypeDeserializer } from "../utils/typeDeserializer.js";
import { hexToBase64, verifyAttestationSigningKey } from "../utils/helpers.js";
/**
 *
 * An AttestationToken represents an RFC 7515 JSON Web Signature object.
 *
 * It can represent either the token returned by the attestation service,
 * or it can be used to create a token locally which can be used to verify
 * attestation policy changes.
 */
export class AttestationTokenImpl {
    /**
     * @internal
     *
     * @param token - Attetation token returned by the attestation service.
     */
    constructor(token) {
        this._token = token;
        const pieces = token.split(".");
        if (pieces.length !== 3) {
            throw Error("Incorrectly formatted token:");
        }
        this._headerBytes = base64UrlDecodeString(pieces[0]);
        this._header = safeJsonParse(bytesToString(this._headerBytes));
        this._bodyBytes = base64UrlDecodeString(pieces[1]);
        this._body = safeJsonParse(bytesToString(this._bodyBytes));
        //      this._signature = base64UrlDecodeString(pieces[2]);
        this._jwsVerifier = jsrsasign.KJUR.jws.JWS.parse(token);
    }
    /**
     * Returns the deserialized body of the AttestationToken object.
     *
     * @returns The body of the attestation token as an object.
     */
    getBody() {
        return this._jwsVerifier.payloadObj;
    }
    /**
     * the token to a string.
     *
     * @remarks
     * Serializes the token to a string.
     *
     * @returns The token serialized to a RFC 7515 JSON Web Signature.
     */
    serialize() {
        return this._token;
    }
    /**
     * Returns the set of problems discovered in the attestation token.
     *
     * @param possibleSigners - the set of possible signers for this attestation token.
     * @param options - validation options
     * @returns an array of string values. If there are no problems, returns an empty array.
     */
    getTokenProblems(possibleSigners, options = {
        validateExpirationTime: true,
        validateToken: true,
        validateNotBeforeTime: true,
    }) {
        let problems = new Array();
        if (!options.validateToken) {
            return problems;
        }
        let foundSigner = undefined;
        if (this.algorithm !== "none") {
            const signers = this.getCandidateSigners(possibleSigners);
            signers.some((signer) => {
                const cert = this.certFromSigner(signer);
                //          const pubKeyObj = cert.getPublicKey();
                const isValid = jsrsasign.KJUR.jws.JWS.verify(this._token, cert);
                if (isValid) {
                    foundSigner = signer;
                }
            });
            if (foundSigner === undefined) {
                problems.push("Attestation Token is not properly signed.");
            }
        }
        // If the token has a body, check the expiration time and issuer.
        if (this._body !== undefined) {
            problems = problems.concat(this.validateTimeProperties(options));
            problems = problems.concat(this.validateIssuer(options));
        }
        if (options.validateAttestationToken !== undefined) {
            // If there is a validation error, the getProblemsCallback will return the list of
            // problems found.
            const validationErrors = options.validateAttestationToken(this, foundSigner);
            if (validationErrors) {
                problems = problems.concat(validationErrors);
            }
        }
        return problems;
    }
    validateIssuer(options) {
        const problems = new Array();
        if (this.issuer && options.validateIssuer) {
            if (this.issuer !== options.expectedIssuer) {
                problems.push("Found issuer: " + this.issuer + "; expected issuer: " + options.expectedIssuer);
            }
        }
        return problems;
    }
    /**
     * Validate the expiration and notbefore time claims in the JSON web token.
     *
     * @param options - Options to be used validating the time properties.
     */
    validateTimeProperties(options) {
        var _a, _b;
        // Calculate the current time as a number of seconds since the start of the
        // Unix epoch.
        const problems = new Array();
        const timeNow = Math.floor(new Date().getTime() / 1000);
        // Validate expiration time.
        if (this.expiresOn !== undefined && options.validateExpirationTime) {
            const expTime = this.expiresOn.getTime() / 1000;
            if (timeNow > expTime) {
                const delta = timeNow - expTime;
                if (delta > ((_a = options.timeValidationSlack) !== null && _a !== void 0 ? _a : 0)) {
                    problems.push("AttestationToken has expired.");
                }
            }
        }
        // Validate not before time.
        if (this.notBefore !== undefined && options.validateNotBeforeTime) {
            const nbfTime = this.notBefore.getTime() / 1000;
            if (nbfTime > timeNow) {
                const delta = nbfTime - timeNow;
                if (delta > ((_b = options.timeValidationSlack) !== null && _b !== void 0 ? _b : 0)) {
                    problems.push("AttestationToken is not yet valid.");
                }
            }
        }
        return problems;
    }
    certFromSigner(signer) {
        // return the PEM encoded certificate.
        return signer.certificates[0];
    }
    getCandidateSigners(possibleSigningCertificates) {
        const candidateSigners = new Array();
        const desiredKeyId = this.keyId;
        if (desiredKeyId !== undefined && possibleSigningCertificates !== undefined) {
            possibleSigningCertificates.forEach((possibleSigner) => {
                if (possibleSigner.keyId === desiredKeyId) {
                    candidateSigners.push(possibleSigner);
                }
            });
            // If we didn't find any candidate signers looking through the provided
            // signing certificates, then maybe there's a certificate chain in the
            // token itself that might be used to sign the token.
            if (candidateSigners.length === 0) {
                if (this.certificateChain !== undefined && this.certificateChain !== null) {
                    candidateSigners.push(this.certificateChain);
                }
            }
        }
        else {
            possibleSigningCertificates === null || possibleSigningCertificates === void 0 ? void 0 : possibleSigningCertificates.map((value) => candidateSigners.push(value));
            if (this.certificateChain !== undefined) {
                candidateSigners.push(this.certificateChain);
            }
        }
        return candidateSigners;
    }
    /** ********* JSON WEB SIGNATURE (RFC 7515) PROPERTIES */
    /**
     * Returns the algorithm from the header of the JSON Web Signature.
     *
     *  See {@link https://www.rfc-editor.org/rfc/rfc7515.html#section-4.1.1 | RFC 7515 Section 4.1.1})
     *  for details.
     *
     * If the value of algorithm is "none" it indicates that the token is unsecured.
     */
    get algorithm() {
        var _a;
        return (_a = this._header) === null || _a === void 0 ? void 0 : _a.alg;
    }
    /**
     *  Json Web Signature Header "kid".
     *   See {@link https://www.rfc-editor.org/rfc/rfc7515.html#section-4.1.4 | RFC 7515 Section 4.1.4})
     *   for details.
     */
    get keyId() {
        return this._header.kid;
    }
    /**
     * Json Web Signature Header "crit".
     *
     *   See {@link https://www.rfc-editor.org/rfc/rfc7515.html#section-4.1.11 | RFC 7515 Section 4.1.11})
     *   for details.
     *
     */
    get critical() {
        return this._header.crit;
    }
    /**
     * Json Web Token Header "content type".
     * See {@link https://www.rfc-editor.org/rfc/rfc7515.html#section-4.1.10 | RFC 7515 Section 4.1.10})
     *
     */
    get contentType() {
        return this._header.cty;
    }
    /**
     * Json Web Token Header "key URL".
     *
     * @see {@link https://www.rfc-editor.org/rfc/rfc7515.html#section-4.1.2 | RFC 7515 Section 4.1.2})
     *
     */
    get keyUrl() {
        return this._header.jku;
    }
    /**
     * Json Web Token Header "X509 Url".
     * @see {@link https://www.rfc-editor.org/rfc/rfc7515.html#section-4.1.5 | RFC 7515 Section 4.1.5})
     *
     */
    get x509Url() {
        return this._header.x5u;
    }
    /** Json Web Token Header "Typ".
     *
     * @see {@link https://www.rfc-editor.org/rfc/rfc7515.html#section-4.1.9 | RFC 7515 Section 4.1.9})
     *
     */
    get type() {
        return this._header.typ;
    }
    /**
     * Json Web Token Header "x509 thumprint".
     * See {@link https://www.rfc-editor.org/rfc/rfc7515.html#section-4.1.7 | RFC 7515 Section 4.1.7})
     */
    get certificateThumbprint() {
        return this._header.x5t;
    }
    /** Json Web Token Header "x509 SHA256 thumprint".
     *
     * See {@link https://www.rfc-editor.org/rfc/rfc7515.html#section-4.1.8 | RFC 7515 Section 4.1.8})
     *
     */
    get certificateSha256Thumbprint() {
        return this._header["x5t#256"];
    }
    /** Json Web Token Header "x509 certificate chain".
     *
     * See {@link https://www.rfc-editor.org/rfc/rfc7515.html#section-4.1.6 | RFC 7515 Section 4.1.6})
     *
     */
    get certificateChain() {
        let jwk;
        if (this._header.jwk !== undefined) {
            jwk = TypeDeserializer.deserialize(this._header.jwk, [Mappers.JsonWebKey], "JsonWebKey");
        }
        else {
            jwk = TypeDeserializer.deserialize(this._header, { JsonWebKey: Mappers.JsonWebKey }, "JsonWebKey");
        }
        return _attestationSignerFromGenerated(jwk);
    }
    /** ********* JSON WEB TOKEN (RFC 7519) PROPERTIES */
    /** Issuer of the attestation token.
     * See {@link https://www.rfc-editor.org/rfc/rfc7519.html#section-4.1.6 | RFC 7519 Section 4.1.6})
     *   for details.
     */
    get issuer() {
        return this._body.iss;
    }
    /** Expiration time for the token, from JWT body.
     *
     * See {@link https://www.rfc-editor.org/rfc/rfc7519.html#section-4.1.4 | RFC 7519 Section 4.1.4})
     *   for details.
     */
    get expiresOn() {
        return this._body.exp ? new Date(this._body.exp * 1000) : undefined;
    }
    /** Issuance time for the token, from JWT body.
     *
     * See {@link https://www.rfc-editor.org/rfc/rfc7519.html#section-4.1.6 | RFC 7519 Section 4.1.6})
     *   for details.
     */
    get issuedAt() {
        return this._body.iat ? new Date(this._body.iat * 1000) : undefined;
    }
    /**
     * Not Before time for the token, from JWT body.
     *
     * See {@link https://www.rfc-editor.org/rfc/rfc7519.html#section-4.1.5 | RFC 7519 Section 4.1.5})
     *   for details.
     */
    get notBefore() {
        return this._body.nbf ? new Date(this._body.nbf * 1000) : undefined;
    }
    /**
     * Creates a new attestation token from a body and signing key.
     * @param body - stringified body of the body of the token to be created.
     * @param signer - Optional signing key used to sign the newly created token.
     * @returns an {@link AttestationToken | attestation token}
     */
    static create(params) {
        var _a;
        const header = { alg: "none" };
        if ((!params.privateKey && params.certificate) || (params.privateKey && !params.certificate)) {
            throw new Error("If privateKey is specified, certificate must also be provided. If certificate is provided, privateKey must also be provided.");
        }
        if (params.privateKey && params.certificate) {
            verifyAttestationSigningKey(params.privateKey, params.certificate);
        }
        if (params.privateKey || params.certificate) {
            const x5c = new jsrsasign.X509();
            x5c.readCertPEM(params.certificate);
            const pubKey = x5c.getPublicKey();
            if (pubKey instanceof jsrsasign.RSAKey) {
                header.alg = "RS256";
            }
            else if (pubKey instanceof jsrsasign.KJUR.crypto.ECDSA) {
                header.alg = "ES256";
            }
            else {
                throw new Error("Unknown public key type: " + typeof pubKey);
            }
            header.x5c = [hexToBase64(x5c.hex)];
        }
        else {
            header.alg = "none";
        }
        const encodedToken = jsrsasign.KJUR.jws.JWS.sign(header.alg, header, (_a = params.body) !== null && _a !== void 0 ? _a : "", params.privateKey);
        return new AttestationTokenImpl(encodedToken);
    }
}
function isObject(thing) {
    return Object.prototype.toString.call(thing) === "[object Object]";
}
function safeJsonParse(thing) {
    if (isObject(thing))
        return thing;
    try {
        return JSON.parse(thing);
    }
    catch (e) {
        return undefined;
    }
}
//# sourceMappingURL=attestationToken.js.map