// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { validateAttestationSigningKey } from "./jws.js";

/** Create an AttestationSigningKey from the provided private key and certificate.
 *
 * @param privateKey - PEM encoded DER Encoded RSA or ECDS key.
 * @param certificate - PEM encoded DER encoded X.509 certificate.
 */
export async function verifyAttestationSigningKey(
  privateKey: string,
  certificate: string,
): Promise<{ certificate: string; privateKey: string }> {
  await validateAttestationSigningKey(privateKey, certificate);
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
