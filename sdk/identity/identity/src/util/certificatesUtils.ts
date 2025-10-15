// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import type { CertificateParts } from "../msal/types.js";
import type {
  ClientCertificateCredentialPEMConfiguration,
  ClientCertificatePEMCertificate,
  ClientCertificatePEMCertificatePath,
} from "../credentials/clientCertificateCredentialModels.js";

/**
 * Extracts public keys from PEM certificate data
 * @param pemData - The PEM certificate data to parse
 * @returns Array of base64-encoded public key strings, empty array if no certificates found
 */
export function extractPemCertificateKeys(pemData: string): string[] {
  if (!pemData || pemData.trim().length === 0) {
    return [];
  }

  const certificatePattern =
    /(-+BEGIN CERTIFICATE-+)(\n\r?|\r\n?)([A-Za-z0-9+/\n\r]+=*)(\n\r?|\r\n?)(-+END CERTIFICATE-+)/g;
  const publicKeys: string[] = [];

  // Match all possible certificates, in the order they are in the file
  let match;
  do {
    match = certificatePattern.exec(pemData);
    if (match) {
      publicKeys.push(match[3]);
    }
  } while (match);

  return publicKeys;
}

/**
 * Validates PEM certificate data by checking for valid certificate blocks
 * @param pemData - The PEM certificate data to validate
 * @returns true if valid PEM certificates are found, false otherwise
 */
export function validatePemCertificates(pemData: string): boolean {
  const publicKeys = extractPemCertificateKeys(pemData);
  return publicKeys.length > 0;
}

/**
 * Parses a certificate into its relevant parts
 *
 * @param certificateConfiguration - The certificate contents or path to the certificate
 * @param sendCertificateChain - true if the entire certificate chain should be sent for SNI, false otherwise
 * @returns The parsed certificate parts and the certificate contents
 */
export async function parseCertificate(
  certificateConfiguration: ClientCertificateCredentialPEMConfiguration,
  sendCertificateChain: boolean,
): Promise<Omit<CertificateParts, "privateKey"> & { certificateContents: string }> {
  const certificate = (certificateConfiguration as ClientCertificatePEMCertificate).certificate;
  const certificatePath = (certificateConfiguration as ClientCertificatePEMCertificatePath)
    .certificatePath;
  const certificateContents = certificate || (await readFile(certificatePath!, "utf8"));
  const x5c = sendCertificateChain ? certificateContents : undefined;

  // Extract public keys using the shared function
  const publicKeys = extractPemCertificateKeys(certificateContents);

  if (publicKeys.length === 0) {
    throw new Error("The file at the specified path does not contain a PEM-encoded certificate.");
  }

  const thumbprint = createHash("sha1") // CodeQL [SM04514] Needed for backward compatibility reason
    .update(Buffer.from(publicKeys[0], "base64"))
    .digest("hex")
    .toUpperCase();

  const thumbprintSha256 = createHash("sha256")
    .update(Buffer.from(publicKeys[0], "base64"))
    .digest("hex")
    .toUpperCase();

  return {
    certificateContents,
    thumbprintSha256,
    thumbprint,
    x5c,
  };
}
