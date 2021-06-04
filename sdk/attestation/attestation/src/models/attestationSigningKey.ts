// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/// <reference path="../jsrsasign.d.ts"/>
/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 */

import * as jsrsasign from "jsrsasign";

/**
 * Creates an instance of AttestationSigningKey.
 *
 * An AttestationSigningKey represents a tuple\<AsymmetricKey, Certificate\> where
 * the certificate wraps the public portion of the asymmetric key. It is used
 * in signing Attestation JSON Web Tokens.
 *
 * Example usage:
 * ```ts
 * import { AttestationSigningKey } from "@azure/security-attestation";
 *
 * const client = new AttestationSigningKey(
 *    "<key value>", "<certificate value>"
 * );
 * ```
 *
 */
export class AttestationSigningKey {
  /**
   *
   * @param key - PEM encoded DER Encoded RSA or ECDS key.
   * @param certificate - PEM encoded DER encoded X.509 certificate.
   */
  constructor(key: string, certificate: string) {
    //
    // Ensure that the key and certificate are associated with each other.
    //
    // Sign a buffer with the key, then verify the signature with the
    // certificate.
    const x509 = new jsrsasign.X509();
    x509.readCertPEM(certificate);

    const alg = x509.getSignatureAlgorithmName();

    const signer = new jsrsasign.KJUR.crypto.Signature({ alg: alg });

    const bufferToSign = "1234";

    signer.init(key);
    signer.updateString(bufferToSign);
    const sigVal = signer.sign();

    const verifier = new jsrsasign.KJUR.crypto.Signature({ alg: alg });
    verifier.init(x509.getPublicKey());
    verifier.updateString(bufferToSign);
    if (!verifier.verify(sigVal)) {
      throw new Error("AttestationSigningKey: Key does not match Certificate.");
    }

    this.certificate = certificate;
    this.key = key;
  }

  /**
   * The PEM encoded RSA or ECDS key to sign an {@link AttestationToken}.
   */
  key: string;

  /**
   * An X.509 Certificate wrapping the {@link key} which will be included in a
   * signed {@link AttestationToken}.
   */
  certificate: string;
}
