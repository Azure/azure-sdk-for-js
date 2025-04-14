// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

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
