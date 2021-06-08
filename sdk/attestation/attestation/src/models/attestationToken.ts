// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../jsrsasign.d.ts"/>
import * as jsrsasign from "jsrsasign";

import { JsonWebKey } from "../generated/models";
import { base64UrlDecodeString, hexToBase64 } from "../utils/base64";
import { AttestationSigningKey } from "./attestationSigningKey";
import { bytesToString } from "../utils/utf8";
import { AttestationSigner } from "./attestationSigner";

import * as Mappers from "../generated/models/mappers";
import { TypeDeserializer } from "../utils/typeDeserializer";
import { base64EncodeByteArray } from "../utils/base64";

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
   * Validation Callback which allows customers to provide their own validation
   * functionality for the attestation token. This can be used to validate
   * the signing certificate in AttestationSigner.
   *
   * @remarks
   *
   * If there is a problem with token validation, the validaitonCallback is expected
   * to throw an exception.
   */
  validationCallback?: (token: AttestationToken, signer?: AttestationSigner) => void;
}

/**
 *
 * An AttestationToken represents an RFC 7515 JSON Web Signature object.
 *
 * It can represent either the token returned by the attestation service,
 * or it can be used to create a token locally which can be used to verify
 * attestation policy changes.
 */
export class AttestationToken {
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
  public getBody(): any {
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
   * Validates the attestation token to verify that it is semantically correct.
   *
   * @param possibleSigners - the set of possible signers for this attestation token.
   * @param options - validation options
   */
  public validateToken(
    possibleSigners?: AttestationSigner[],
    options: AttestationTokenValidationOptions = {
      validateExpirationTime: true,
      validateToken: true,
      validateNotBeforeTime: true
    }
  ): void {
    if (!options.validateToken) {
      return;
    }

    let foundSigner: AttestationSigner | undefined = undefined;
    if (this.algorithm !== "none") {
      const signers = this.getCandidateSigners(possibleSigners);

      signers.some((signer) => {
        const cert = this.certFromSigner(signer);
        //          const pubKeyObj = cert.getPublicKey();

        const isValid = jsrsasign.KJUR.jws.JWS.verify(this._token, cert);

        if (isValid) {
          foundSigner = signer;
          return;
        }
      });

      if (foundSigner === undefined) {
        throw new Error("Attestation Token is not properly signed.");
      }
    }

    // If the token has a body, check the expiration time and issuer.
    if (this._body !== undefined) {
      this.validateTimeProperties(options);
      this.validateIssuer(options);
    }

    if (options.validationCallback !== undefined) {
      // If there is a validation error, the validationCallback will throw a customer
      // defined exception.
      options.validationCallback(this, foundSigner);
    }
  }

  private validateIssuer(options: AttestationTokenValidationOptions): void {
    if (this.issuer && options.validateIssuer) {
      if (this.issuer !== options.expectedIssuer) {
        throw new Error(
          "Found issuer: " + this.issuer + "; expected issuer: " + options.expectedIssuer
        );
      }
    }
  }
  /**
   * Validate the expiration and notbefore time claims in the JSON web token.
   *
   * @param options - Options to be used validating the time properties.
   */
  private validateTimeProperties(options: AttestationTokenValidationOptions): void {
    // Calculate the current time as a number of seconds since the start of the
    // Unix epoch.
    const timeNow = Math.floor(new Date().getTime() / 1000);

    // Validate expiration time.
    if (this.expirationTime !== undefined && options.validateExpirationTime) {
      const expTime = this.expirationTime.getTime() / 1000;
      if (timeNow > expTime) {
        const delta = timeNow - expTime;
        if (delta > (options.timeValidationSlack ?? 0)) {
          throw new Error("AttestationToken has expired.");
        }
      }
    }

    // Validate not before time.
    if (this.notBeforeTime !== undefined && options.validateNotBeforeTime) {
      const nbfTime = this.notBeforeTime.getTime() / 1000;
      if (nbfTime > timeNow) {
        const delta = nbfTime - timeNow;
        if (delta > (options.timeValidationSlack ?? 0)) {
          throw new Error("AttestationToken is not yet valid.");
        }
      }
    }
  }

  private certFromSigner(signer: AttestationSigner): string {
    let pemCert: string;

    // PEM encode the certificate.
    pemCert = "-----BEGIN CERTIFICATE-----\r\n";
    pemCert += base64EncodeByteArray(signer.certificates[0]);
    pemCert += "\r\n-----END CERTIFICATE-----\r\n";

    //      const cert = new X509();
    //
    //      cert.readCertPEM(pemCert);
    return pemCert;
  }

  private getCandidateSigners(
    possibleSigningCertificates?: AttestationSigner[]
  ): AttestationSigner[] {
    const candidateSigners = new Array<AttestationSigner>();

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
    } else {
      possibleSigningCertificates?.map((value) => candidateSigners.push(value));
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
        "JsonWebKey"
      ) as JsonWebKey;
    } else {
      jwk = TypeDeserializer.deserialize(
        this._header,
        { JsonWebKey: Mappers.JsonWebKey },
        "JsonWebKey"
      ) as JsonWebKey;
    }
    return new AttestationSigner(jwk);
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
  public get expirationTime(): Date | undefined {
    return this._body.exp ? new Date(this._body.exp * 1000) : undefined;
  }

  /** Issuance time for the token, from JWT body.
   *
   * See {@link https://www.rfc-editor.org/rfc/rfc7519.html#section-4.1.6 | RFC 7519 Section 4.1.6})
   *   for details.
   */
  public get issuedAtTime(): Date | undefined {
    return this._body.iat ? new Date(this._body.iat * 1000) : undefined;
  }

  /**
   * Not Before time for the token, from JWT body.
   *
   * See {@link https://www.rfc-editor.org/rfc/rfc7519.html#section-4.1.5 | RFC 7519 Section 4.1.5})
   *   for details.
   */
  public get notBeforeTime(): Date | undefined {
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
    signer?: AttestationSigningKey;
  }): AttestationToken {
    const header: {
      alg: string;
      [k: string]: any;
    } = { alg: "none" };

    if (params.signer) {
      const x5c = new jsrsasign.X509();
      x5c.readCertPEM(params.signer?.certificate);
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
      params.signer?.key
    );
    return new AttestationToken(encodedToken);
  }
}

function isObject(thing: any): boolean {
  return Object.prototype.toString.call(thing) === "[object Object]";
}

function safeJsonParse(thing: any): any {
  if (isObject(thing)) return thing;
  try {
    return JSON.parse(thing);
  } catch (e) {
    return undefined;
  }
}
