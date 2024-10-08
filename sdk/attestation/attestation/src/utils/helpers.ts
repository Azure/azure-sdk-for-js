// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../jsrsasign.d.ts"/>
import * as jsrsasign from "jsrsasign";
import { base64EncodeByteArray, hexToByteArray } from "./base64";

/** Create an AttestationSigningKey from the provided private key and certificate.
 *
 * @param privateKey - PEM encoded DER Encoded RSA or ECDS key.
 * @param certificate - PEM encoded DER encoded X.509 certificate.
 */
export function verifyAttestationSigningKey(
  privateKey: string,
  certificate: string,
): { certificate: string; privateKey: string } {
  //
  // Ensure that the key and certificate are associated with each other.
  //
  // Sign a buffer with the key, then verify the signature with the
  // certificate.
  const x509 = new jsrsasign.X509();
  x509.readCertPEM(certificate);

  const alg = x509.getSignatureAlgorithmName();

  const signer = new jsrsasign.KJUR.crypto.Signature({ alg: alg });

  // Confirm that the certificate and private key are related to each other.
  const bufferToSign = "1234";

  signer.init(privateKey);
  signer.updateString(bufferToSign);
  const sigVal = signer.sign();

  const verifier = new jsrsasign.KJUR.crypto.Signature({ alg: alg });
  verifier.init(x509.getPublicKey());
  verifier.updateString(bufferToSign);
  if (!verifier.verify(sigVal)) {
    throw new Error("verifyAttestationSigningKey: Key does not match Certificate.");
  }
  return { certificate: certificate, privateKey: privateKey };
}

export type PemType = "CERTIFICATE" | "PRIVATE KEY";

/**
 *
 * @param base64 - Base64 encoded DER object to encode as PEM.
 * @param pemType - PEM object type - typically "CERTIFICATE" |
 */
export function pemFromBase64(base64: string, pemType: PemType): string {
  let pem = "-----BEGIN " + pemType + "-----\n";
  while (base64 !== "") {
    pem += base64.substr(0, 64) + "\n";
    base64 = base64.substr(64);
  }
  pem += "-----END " + pemType + "-----\n";

  return pem;
}

/**
 * Converts a hex encoded string to its base64 equivalent.
 * @param value - Hex encoded value
 */
export function hexToBase64(value: string): string {
  return base64EncodeByteArray(hexToByteArray(value));
}
