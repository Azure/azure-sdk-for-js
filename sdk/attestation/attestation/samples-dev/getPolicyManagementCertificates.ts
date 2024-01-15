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
 *  1) ATTESTATION_ISOLATED_URL - the base URL for an attestation service instance in Isolated mode.
 *
 * To authorize access to the service, this sample also depends on the following
 * environment variables:
 *  AZURE_TENANT_ID - AAD Tenant ID used to authenticate the user.
 *  AZURE_CLIENT_ID - AAD Client ID used to authenticate the user.
 *  AZURE_CLIENT_SECRET - AAD Secret used to authenticate the client.
 */

import { AttestationAdministrationClient } from "@azure/attestation";
import { DefaultAzureCredential } from "@azure/identity";

import { X509 } from "jsrsasign";

// Load environment from a .env file if it exists.
import * as dotenv from "dotenv";
import { writeBanner } from "./utils/helpers";
dotenv.config();

async function getPolicyManagementCertificates() {
  writeBanner("Get Current Attestation Policy Management Certificates.");

  // Use the specified attestion URL.
  const endpoint = process.env.ATTESTATION_ISOLATED_URL;
  if (endpoint === undefined) {
    throw new Error("Attestation endpoint must be provided.");
  }
  const client = new AttestationAdministrationClient(endpoint, new DefaultAzureCredential());

  const policyCertificates = await client.getPolicyManagementCertificates();
  console.log(
    `Attestation Instance ${endpoint} has ${policyCertificates.body.length} certificates.`,
  );
  // Now print the Key ID and certificate subject for each signer.
  policyCertificates.body.forEach((element) => {
    console.log(`  Element Key ID: ${element.keyId};`);
    const cert = new X509();
    cert.readCertPEM(element.certificates[0]);
    console.log(`    Certificate subject: ${cert.getSubjectString()}`);
  });
}

export async function main() {
  await getPolicyManagementCertificates();
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
