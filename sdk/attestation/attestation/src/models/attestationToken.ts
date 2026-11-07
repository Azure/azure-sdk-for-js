// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../jsrsasign.d.ts"/>
import * as jsrsasign from "jsrsasign";

import type { JsonWebKey } from "../generated/models/index.js";
import { base64UrlDecodeString } from "../utils/base64.js";
import { bytesToString } from "../utils/utf8.js";
import type { AttestationSigner } from "./attestationSigner.js";
import { _attestationSignerFromGenerated } from "./attestationSigner.js";

import * as Mappers from "../generated/models/mappers.js";
import { TypeDeserializer } from "../utils/typeDeserializer.js";
import { hexToBase64, verifyAttestationSigningKey } from "../utils/helpers.js";

// Asymmetric JWS algorithms only: excludes "none" and the HMAC (HS*) family.
const ASYMMETRIC_SIGNATURE_ALGORITHMS = [
  "RS256",
  "RS384",
  "RS512",
  "PS256",
  "PS384",
  "PS512",
  "ES256",
  "ES384",
  "ES512",
];

// Used when no validation options are provided, as in earlier versions.
const DEFAULT_VALIDATION_OPTIONS: AttestationTokenValidationOptions = {
  validateExpirationTime: true,
  validateToken: true,
  validateNotBeforeTime: true,
};

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
 *  If no validation options are provided, validateToken, validateExpirationTime, and
 *  validateNotBeforeTime are all true. If validation options are provided (for the clients,
 *  on the client or on the operation), an omitted validateToken is still true, but an omitted
 *  validateExpirationTime or validateNotBeforeTime is false, so that time is not checked.
 *
 */
export interface AttestationTokenValidationOptions {
  /**
   * If true, validate the attestation token, if false, skip validation,
   * including `validateAttestationToken`. Defaults to true.
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
  validateAttestationToken?: (
    token: AttestationToken,
    signer?: AttestationSigner,
  ) => string[] | undefined;
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
   *
   * @remarks
   *
   * Unlike the clients' validation of tokens returned by the service, which accepts an unsigned
   * token only in response to a draft policy request, this method accepts any unsigned token,
   * and it can verify the signature with the certificate embedded in the token itself, so an
   * empty result does not show that the attestation service issued the token. A token returned
   * by a client operation with `validateToken: false` was not validated by the client.
   */
  getTokenProblems(
    possibleSigners?: AttestationSigner[],
    options?: AttestationTokenValidationOptions,
  ): string[];

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
export class AttestationTokenImpl implements AttestationToken {
  /**
   * @internal
   *
   * @param token - Attetation token returned by the attestation service.
   */
  constructor(token: string) {
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

  private _token: string;
  private _headerBytes: Uint8Array;
  private _header: any;
  private _bodyBytes: Uint8Array;
  private _body: any;
  //    private _signature: Uint8Array;

  private _jwsVerifier: any; // jsrsasign.KJUR.jws.JWS.JWSResult;

  /**
   * Returns the deserialized body of the AttestationToken object.
   *
   * @returns The body of the attestation token as an object.
   */
  public getBody(): unknown {
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
  public serialize(): string {
    return this._token;
  }

  /**
   * Returns the set of problems discovered in the attestation token.
   *
   * @param possibleSigners - the set of possible signers for this attestation token.
   * @param options - validation options
   * @returns an array of string values. If there are no problems, returns an empty array.
   */
  public getTokenProblems(
    possibleSigners?: AttestationSigner[],
    options: AttestationTokenValidationOptions = DEFAULT_VALIDATION_OPTIONS,
  ): string[] {
    return this.getProblems(possibleSigners, options, {
      allowUnsigned: true,
      trustEmbeddedCertificate: true,
    });
  }

  /**
   * @internal
   *
   * Validates a token returned by the attestation service. Only the trusted signers retrieved
   * from the service can verify its signature; the certificate embedded in the token is never
   * trusted. The service returns unsigned tokens only for requests with a draft policy, so
   * unsigned tokens are accepted only when `allowUnsigned` is true.
   */
  public _getServiceTokenProblems(
    trustedSigners: AttestationSigner[],
    options: AttestationTokenValidationOptions | undefined,
    allowUnsigned: boolean,
  ): string[] {
    return this.getProblems(trustedSigners, options ?? DEFAULT_VALIDATION_OPTIONS, {
      allowUnsigned,
      trustEmbeddedCertificate: false,
    });
  }

  private getProblems(
    possibleSigners: AttestationSigner[] | undefined,
    options: AttestationTokenValidationOptions,
    policy: { allowUnsigned: boolean; trustEmbeddedCertificate: boolean },
  ): string[] {
    let problems = new Array<string>();
    if (!(options.validateToken ?? true)) {
      return problems;
    }

    let foundSigner: AttestationSigner | undefined = undefined;
    if (this.algorithm === "none") {
      if (!policy.allowUnsigned) {
        problems.push("Attestation Token is not signed.");
      }
    } else if (!ASYMMETRIC_SIGNATURE_ALGORITHMS.includes(this.algorithm)) {
      problems.push(`Unsupported attestation token algorithm: ${this.algorithm}`);
    } else {
      foundSigner = this.getCandidateSigners(possibleSigners, policy.trustEmbeddedCertificate).find(
        (signer) => this.verifySignature(signer),
      );

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

  private validateIssuer(options: AttestationTokenValidationOptions): string[] {
    const problems = new Array<string>();
    if (this.issuer && options.validateIssuer) {
      if (this.issuer !== options.expectedIssuer) {
        problems.push(
          "Found issuer: " + this.issuer + "; expected issuer: " + options.expectedIssuer,
        );
      }
    }
    return problems;
  }
  /**
   * Validate the expiration and notbefore time claims in the JSON web token.
   *
   * @param options - Options to be used validating the time properties.
   */
  private validateTimeProperties(options: AttestationTokenValidationOptions): string[] {
    // Calculate the current time as a number of seconds since the start of the
    // Unix epoch.
    const problems = new Array<string>();
    const timeNow = Math.floor(new Date().getTime() / 1000);

    // Validate expiration time.
    if (this.expiresOn !== undefined && options.validateExpirationTime) {
      const expTime = this.expiresOn.getTime() / 1000;
      if (timeNow > expTime) {
        const delta = timeNow - expTime;
        if (delta > (options.timeValidationSlack ?? 0)) {
          problems.push("AttestationToken has expired.");
        }
      }
    }

    // Validate not before time.
    if (this.notBefore !== undefined && options.validateNotBeforeTime) {
      const nbfTime = this.notBefore.getTime() / 1000;
      if (nbfTime > timeNow) {
        const delta = nbfTime - timeNow;
        if (delta > (options.timeValidationSlack ?? 0)) {
          problems.push("AttestationToken is not yet valid.");
        }
      }
    }
    return problems;
  }

  private certFromSigner(signer: AttestationSigner): string {
    // return the PEM encoded certificate.
    return signer.certificates[0];
  }

  private verifySignature(signer: AttestationSigner): boolean {
    try {
      return jsrsasign.KJUR.jws.JWS.verify(
        this._token,
        this.certFromSigner(signer),
        ASYMMETRIC_SIGNATURE_ALGORITHMS,
      );
    } catch {
      return false;
    }
  }

  /**
   * Returns the signers which may have signed this token: the supplied signers matching the
   * token's key id, or all of them if the token has no key id.
   *
   * When `trustEmbeddedCertificate` is true (direct calls to getTokenProblems, unchanged from
   * earlier versions), the certificate chain embedded in the token is also a candidate, so a
   * successful check does not show that the token was issued by the attestation service.
   */
  private getCandidateSigners(
    possibleSigners: AttestationSigner[] | undefined,
    trustEmbeddedCertificate: boolean,
  ): AttestationSigner[] {
    const desiredKeyId = this.keyId;
    if (!trustEmbeddedCertificate) {
      if (!possibleSigners) {
        return [];
      }
      return desiredKeyId !== undefined
        ? possibleSigners.filter((signer) => signer.keyId === desiredKeyId)
        : possibleSigners;
    }

    const candidateSigners = new Array<AttestationSigner>();
    if (desiredKeyId !== undefined && possibleSigners !== undefined) {
      possibleSigners.forEach((possibleSigner) => {
        if (possibleSigner.keyId === desiredKeyId) {
          candidateSigners.push(possibleSigner);
        }
      });
      if (candidateSigners.length === 0) {
        const embeddedSigner = this.certificateChain;
        if (embeddedSigner) {
          candidateSigners.push(embeddedSigner);
        }
      }
    } else {
      possibleSigners?.forEach((value) => candidateSigners.push(value));
      const embeddedSigner = this.certificateChain;
      if (embeddedSigner) {
        candidateSigners.push(embeddedSigner);
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
  public get algorithm(): string {
    return this._header?.alg;
  }

  /**
   *  Json Web Signature Header "kid".
   *   See {@link https://www.rfc-editor.org/rfc/rfc7515.html#section-4.1.4 | RFC 7515 Section 4.1.4})
   *   for details.
   */
  public get keyId(): string | undefined {
    return this._header.kid;
  }

  /**
   * Json Web Signature Header "crit".
   *
   *   See {@link https://www.rfc-editor.org/rfc/rfc7515.html#section-4.1.11 | RFC 7515 Section 4.1.11})
   *   for details.
   *
   */
  public get critical(): boolean | undefined {
    return this._header.crit;
  }

  /**
   * Json Web Token Header "content type".
   * See {@link https://www.rfc-editor.org/rfc/rfc7515.html#section-4.1.10 | RFC 7515 Section 4.1.10})
   *
   */
  public get contentType(): string | undefined {
    return this._header.cty;
  }

  /**
   * Json Web Token Header "key URL".
   *
   * @see {@link https://www.rfc-editor.org/rfc/rfc7515.html#section-4.1.2 | RFC 7515 Section 4.1.2})
   *
   */
  public get keyUrl(): string | undefined {
    return this._header.jku;
  }

  /**
   * Json Web Token Header "X509 Url".
   * @see {@link https://www.rfc-editor.org/rfc/rfc7515.html#section-4.1.5 | RFC 7515 Section 4.1.5})
   *
   */
  public get x509Url(): string | undefined {
    return this._header.x5u;
  }

  /** Json Web Token Header "Typ".
   *
   * @see {@link https://www.rfc-editor.org/rfc/rfc7515.html#section-4.1.9 | RFC 7515 Section 4.1.9})
   *
   */
  public get type(): string | undefined {
    return this._header.typ;
  }

  /**
   * Json Web Token Header "x509 thumprint".
   * See {@link https://www.rfc-editor.org/rfc/rfc7515.html#section-4.1.7 | RFC 7515 Section 4.1.7})
   */
  public get certificateThumbprint(): string | undefined {
    return this._header.x5t;
  }

  /** Json Web Token Header "x509 SHA256 thumprint".
   *
   * See {@link https://www.rfc-editor.org/rfc/rfc7515.html#section-4.1.8 | RFC 7515 Section 4.1.8})
   *
   */
  public get certificateSha256Thumbprint(): string | undefined {
    return this._header["x5t#256"];
  }

  /** Json Web Token Header "x509 certificate chain".
   *
   * See {@link https://www.rfc-editor.org/rfc/rfc7515.html#section-4.1.6 | RFC 7515 Section 4.1.6})
   *
   */
  public get certificateChain(): AttestationSigner | undefined {
    let jwk: JsonWebKey;
    if (this._header.jwk !== undefined) {
      jwk = TypeDeserializer.deserialize(
        this._header.jwk,
        [Mappers.JsonWebKey],
        "JsonWebKey",
      ) as JsonWebKey;
    } else {
      jwk = TypeDeserializer.deserialize(
        this._header,
        { JsonWebKey: Mappers.JsonWebKey },
        "JsonWebKey",
      ) as JsonWebKey;
    }
    return _attestationSignerFromGenerated(jwk);
  }

  /** ********* JSON WEB TOKEN (RFC 7519) PROPERTIES */

  /** Issuer of the attestation token.
   * See {@link https://www.rfc-editor.org/rfc/rfc7519.html#section-4.1.6 | RFC 7519 Section 4.1.6})
   *   for details.
   */
  public get issuer(): string | undefined {
    return this._body.iss;
  }

  /** Expiration time for the token, from JWT body.
   *
   * See {@link https://www.rfc-editor.org/rfc/rfc7519.html#section-4.1.4 | RFC 7519 Section 4.1.4})
   *   for details.
   */
  public get expiresOn(): Date | undefined {
    return this._body.exp ? new Date(this._body.exp * 1000) : undefined;
  }

  /** Issuance time for the token, from JWT body.
   *
   * See {@link https://www.rfc-editor.org/rfc/rfc7519.html#section-4.1.6 | RFC 7519 Section 4.1.6})
   *   for details.
   */
  public get issuedAt(): Date | undefined {
    return this._body.iat ? new Date(this._body.iat * 1000) : undefined;
  }

  /**
   * Not Before time for the token, from JWT body.
   *
   * See {@link https://www.rfc-editor.org/rfc/rfc7519.html#section-4.1.5 | RFC 7519 Section 4.1.5})
   *   for details.
   */
  public get notBefore(): Date | undefined {
    return this._body.nbf ? new Date(this._body.nbf * 1000) : undefined;
  }

  /**
   * Creates a new attestation token from a body and signing key.
   * @param body - stringified body of the body of the token to be created.
   * @param signer - Optional signing key used to sign the newly created token.
   * @returns an {@link AttestationToken | attestation token}
   */
  public static create(params: {
    body?: string;
    privateKey?: string;
    certificate?: string;
  }): AttestationToken {
    const header: {
      alg: string;
      [k: string]: any;
    } = { alg: "none" };

    if ((!params.privateKey && params.certificate) || (params.privateKey && !params.certificate)) {
      throw new Error(
        "If privateKey is specified, certificate must also be provided. If certificate is provided, privateKey must also be provided.",
      );
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
      } else if (pubKey instanceof jsrsasign.KJUR.crypto.ECDSA) {
        header.alg = "ES256";
      } else {
        throw new Error("Unknown public key type: " + typeof pubKey);
      }
      header.x5c = [hexToBase64(x5c.hex)];
    } else {
      header.alg = "none";
    }

    const encodedToken = jsrsasign.KJUR.jws.JWS.sign(
      header.alg,
      header,
      params.body ?? "",
      params.privateKey,
    );
    return new AttestationTokenImpl(encodedToken);
  }
}

/**
 * @internal
 *
 * Combines the client's validation options with the options of an individual operation. Options
 * set on the operation take precedence; options it leaves undefined keep the client's values.
 * If only one of them is provided, it is returned unchanged; if neither is, returns undefined so
 * the default validation options apply. Options are read by property access, so inherited
 * properties (for example a class method) are kept, and the callback is called on its own object.
 */
export function _combineValidationOptions(
  clientOptions?: AttestationTokenValidationOptions,
  operationOptions?: AttestationTokenValidationOptions,
): AttestationTokenValidationOptions | undefined {
  if (operationOptions === undefined) {
    return clientOptions;
  }
  if (clientOptions === undefined) {
    return operationOptions;
  }
  const callbackOwner =
    operationOptions.validateAttestationToken !== undefined ? operationOptions : clientOptions;
  return {
    validateToken: operationOptions.validateToken ?? clientOptions.validateToken,
    validateExpirationTime:
      operationOptions.validateExpirationTime ?? clientOptions.validateExpirationTime,
    validateNotBeforeTime:
      operationOptions.validateNotBeforeTime ?? clientOptions.validateNotBeforeTime,
    validateIssuer: operationOptions.validateIssuer ?? clientOptions.validateIssuer,
    expectedIssuer: operationOptions.expectedIssuer ?? clientOptions.expectedIssuer,
    timeValidationSlack: operationOptions.timeValidationSlack ?? clientOptions.timeValidationSlack,
    validateAttestationToken:
      callbackOwner.validateAttestationToken === undefined
        ? undefined
        : (token, signer) => callbackOwner.validateAttestationToken?.(token, signer),
  };
}

function isObject(thing: any): boolean {
  return Object.prototype.toString.call(thing) === "[object Object]";
}

function safeJsonParse(thing: any): any {
  if (isObject(thing)) return thing;
  try {
    return JSON.parse(thing);
  } catch (e: any) {
    return undefined;
  }
}
