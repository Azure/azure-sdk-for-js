// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates the use of a Attestation Instance to retrieve an attestation policy.
 */

import { AttestationAdministrationClient, KnownAttestationType } from "@azure/attestation";
import { DefaultAzureCredential } from "@azure/identity";

// Load environment from a .env file if it exists.
import * as dotenv from "dotenv";
import { write_banner } from "./utils/helpers";
dotenv.config();

async function getCurrentAttestationPolicy() {
  write_banner("getCurrentAttestationPolicy");

  // Use the customer specified attestion URL, or use the West US shared instance.
  const endpoint = process.env.ATTESTATION_AAD_URL ?? "https://sharedwus.wus.attest.azure.net";

  const client = new AttestationAdministrationClient(new DefaultAzureCredential(), endpoint);

  const policy = await client.getPolicy(KnownAttestationType.SgxEnclave);

  console.log("The SGX policy for ", endpoint, " has a value of:", policy.value);
}

export async function main() {
  await getCurrentAttestationPolicy();
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

