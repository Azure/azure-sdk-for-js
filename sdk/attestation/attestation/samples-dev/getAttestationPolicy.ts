// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates the use of a Attestation Instance to retrieve an attestation policy.
 *
 * FILE: getAttestationPolicy.ts
 *
 * DESCRIPTION:
 *  This sample demonstrates using the attestation administration APIs to retrieve
 *  attestation policy documents for the various modes of operation of the attestation
 *  service.
 *
 *  Set the following environment variables with your own values before running
 *  the samples:
 *
 *  1) ATTESTATION_AAD_URL - the base URL for an attestation service instance in AAD mode.
 *  2) ATTESTATION_ISOLATED_URL - the base URL for an attestation service instance in Isolated mode.
 *
 * To authorize access to the service, this sample also depends on the following
 * environment variables:
 *  AZURE_TENANT_ID - AAD Tenant ID used to authenticate the user.
 *  AZURE_CLIENT_ID - AAD Client ID used to authenticate the user.
 *  AZURE_CLIENT_SECRET - AAD Secret used to authenticate the client.
 */

import { AttestationAdministrationClient, KnownAttestationType } from "@azure/attestation";
import { DefaultAzureCredential } from "@azure/identity";
import { writeBanner } from "./utils/helpers.js";
// Load environment from a .env file if it exists.
import "dotenv/config";

async function getCurrentAttestationPolicyAad(): Promise<void> {
  writeBanner("Get Current Attestation Policy - AAD instance.");

  // Use the specified attestion URL.
  const endpoint = process.env.ATTESTATION_AAD_URL;
  if (endpoint === undefined) {
    throw new Error("Attestation endpoint must be provided.");
  }
  const client = new AttestationAdministrationClient(endpoint, new DefaultAzureCredential());

  const policy = await client.getPolicy(KnownAttestationType.SgxEnclave);

  console.log("The SGX policy for ", endpoint, " has a value of:", policy.body);
}

async function getCurrentAttestationPolicyShared(): Promise<void> {
  writeBanner("Get Current Attestation Policy - Shared instance.");

  // Use the the West US shared instance.
  //
  // Other shared instances include (but are not limited to):
  //   https://sharedcus.cus.attest.azure.net
  //   https://sharedcae.cae.attest.azure.net
  //   https://sharedeus.eus.attest.azure.net
  //   https://sharedeus2.eus2.attest.azure.net
  //   https://shareduks.uks.attest.azure.net
  //
  const endpoint = "https://sharedwus.wus.attest.azure.net";

  const client = new AttestationAdministrationClient(endpoint, new DefaultAzureCredential());

  const policy = await client.getPolicy(KnownAttestationType.SgxEnclave);

  console.log("The SGX policy for ", endpoint, " has a value of:", policy.body);
}

export async function main(): Promise<void> {
  await getCurrentAttestationPolicyAad();
  await getCurrentAttestationPolicyShared();
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
