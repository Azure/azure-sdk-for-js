// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { X509Certificate } from "crypto";

/**
 * Extracts public keys from PEM certificate content
 * @param pemData - The PEM certificate data to parse
 * @returns Array of base64-encoded public key strings
 */
export function extractPemCertificateKeys(pemContent: string): string[] {
  const certificatePattern =
    /(-+BEGIN CERTIFICATE-+)(\n\r?|\r\n?)([A-Za-z0-9+/\n\r]+=*)(\n\r?|\r\n?)(-+END CERTIFICATE-+)/g;
  const publicKeys: string[] = [];

  // Match all possible certificates, in the order they are in the file. These will form the chain that is used for x5c
  let match;
  do {
    match = certificatePattern.exec(pemContent);
    if (match) {
      publicKeys.push(match[3]);
    }
  } while (match);

  if (publicKeys.length === 0) {
    throw new Error("The file at the specified path does not contain a PEM-encoded certificate.");
  }

  return publicKeys;
}

/**
 * Checks if PEM certificate content can be parsed as X509Certificate
 * @param pemCert - The PEM certificate
 * @returns true if all certificates in the PEM content can be parsed without error
 */
export function canParseAsX509Certificate(pemCert: string): boolean {
  try {
    const pemContents = extractPemCertificateKeys(pemCert);

    for (let i = 0; i < pemContents.length; i++) {
      const pemContent = pemContents[i];
      // Reconstruct the full PEM format for X509Certificate constructor
      const fullPemCertificate = `-----BEGIN CERTIFICATE-----\n${pemContent}\n-----END CERTIFICATE-----`;
      // Attempt to parse as X.509 certificate
      new X509Certificate(fullPemCertificate);
    }
    return true;
  } catch (extractError) {
    // Return false for any error (extraction or parsing)
    return false;
  }
}
