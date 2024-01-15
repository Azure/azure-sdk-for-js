// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates the use of a Attestation Instance to retrieve the set of policy
 *      management certificates for the specified policy.
 *
 * FILE: getPolicyManagementCertificates.ts
 *
 * DESCRIPTION:
 *  This sample demonstrates using the attestation administration APIs to retrieve
 *  attestation the policy management certificates for an isolated Attestation
 *  Service instance.
 *
 *  Set the following environment variables with your own values before running
 *  the samples:
 *
 *  1) ATTESTATION_ISOLATED_URL - the base URL for an attestation service instance
 *      in Isolated mode.
 *  2) ATTESTATION_ISOLATED_SIGNING_CERTIFICATE - A Base64 encoded DER X.509 certificate which is one of the Isolated
 *      mode signing certificates.
 *  3) ATTESTATION_ISOLATED_SIGNING_KEY - A Base64 encoded DER RSA Private key which
 *      corresponds to the ATTESTATION_ISOLATED_SIGNING_CERTIFICATE.
 *
 * To authorize access to the service, this sample also depends on the following
 * environment variables:
 *  AZURE_TENANT_ID - AAD Tenant ID used to authenticate the user.
 *  AZURE_CLIENT_ID - AAD Client ID used to authenticate the user.
 *  AZURE_CLIENT_SECRET - AAD Secret used to authenticate the client.
 */

import { AttestationAdministrationClient } from "@azure/attestation";
import { DefaultAzureCredential } from "@azure/identity";
import { createRSAKey, createX509Certificate, generateSha1Hash } from "./utils/cryptoUtils";
import { X509 } from "jsrsasign";

// Load environment from a .env file if it exists.
import * as dotenv from "dotenv";
import { writeBanner } from "./utils/helpers";
import { byteArrayToHex } from "../src/utils/base64";
dotenv.config();

async function modifyPolicyManagementCertificates() {
  writeBanner("Get Current Attestation Policy Management Certificates.");

  // Use the specified attestion URL.
  const endpoint = process.env.ATTESTATION_ISOLATED_URL;
  if (endpoint === undefined) {
    throw new Error("ATTESTATION_ISOLATED_URL must be defined.");
  }
  const base64PrivateKey = process.env.ATTESTATION_ISOLATED_SIGNING_KEY;
  if (base64PrivateKey === undefined) {
    throw new Error("ATTESTATION_ISOLATED_SIGNING_KEY must be provided.");
  }
  const base64Certificate = process.env.ATTESTATION_ISOLATED_SIGNING_CERTIFICATE;
  if (base64Certificate === undefined) {
    throw new Error("ATTESTATION_ISOLATED_SIGNING_CERTIFICATE must be provided.");
  }

  const client = new AttestationAdministrationClient(endpoint, new DefaultAzureCredential());

  const [rsaKey, rsaPubKey] = createRSAKey();
  const rsaCertificate = createX509Certificate(rsaKey, rsaPubKey, "CertificateName");

  // Decode the PEM encoded certificate for validation later.
  const cert = new X509();
  cert.readCertPEM(rsaCertificate);

  const expectedThumbprint = byteArrayToHex(generateSha1Hash(cert.hex)).toUpperCase();

  // Add the new attestation signing certificate.
  //
  // Because this is an isolated instance, we need to sign certificate requests with
  // one of the configured signing certificates/keys.

  const privateKey = pemFromBase64(base64PrivateKey, "PRIVATE KEY");
  const certificate = pemFromBase64(base64Certificate, "CERTIFICATE");

  {
    // Add a new signing certificate.
    const setResult = await client.addPolicyManagementCertificate(
      rsaCertificate,
      privateKey,
      certificate,
    );

    console.log("Certificate modification result: ", setResult.body.certificateResolution);
    console.log("Modified Certificate Thumbprint: ", setResult.body.certificateThumbprint);
    console.log("Expected Certificate Thumbprint: ", expectedThumbprint);
  }

  {
    const removeResult = await client.removePolicyManagementCertificate(
      rsaCertificate,
      privateKey,
      certificate,
    );
    console.log("Certificate modification result: ", removeResult.body.certificateResolution);
    console.log("Modified Certificate Thumbprint: ", removeResult.body.certificateThumbprint);
    console.log("Expected Certificate Thumbprint: ", expectedThumbprint);
  }
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

export async function main() {
  await modifyPolicyManagementCertificates();
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
