/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 */

import { X509, KJUR } from "jsrsasign";


  /**
   * Creates an instance of AttestationSigningKey.
   * 
   * An AttestationSigningKey represents a tuple<AsymmetricKey, Certificate> where
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
export class AttestationSigningKey
{
    /**
     * 
     * @param key - PEM encoded DER Encoded RSA or ECDS key.
     * @param certificate - PEM encoded DER encoded X.509 certificate.
     */
    constructor(key : string, certificate : string) {
        //
        // Ensure that the key and certificate are associated with each other.
        //
        // Sign a buffer with the key, then verify the signature with the
        // certificate.
        let x509 = new X509();
        x509.readCertPEM(certificate);

        let alg = x509.getSignatureAlgorithmName()

        let signer = new KJUR.crypto.Signature({"alg": alg});

        let bufferToSign = "1234";

        signer.init(key);
        signer.updateString(bufferToSign);
        let sigVal = signer.sign();

        let verifier = new KJUR.crypto.Signature({"alg": alg});
        verifier.init(x509.getPublicKey());
        verifier.updateString(bufferToSign);
        if (!verifier.verify(sigVal))
        {
            throw new Error("AttestationSigningKey: Key does not match Certificate.");
        }

        this.certificate = certificate;
        this.key = key;
    }

    key: string;
    certificate: string;
};
