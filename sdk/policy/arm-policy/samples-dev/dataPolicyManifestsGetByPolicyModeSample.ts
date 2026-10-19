// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PolicyClient } from "@azure/arm-policy";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to this operation retrieves the data policy manifest with the given policy mode.
 *
 * @summary this operation retrieves the data policy manifest with the given policy mode.
 * x-ms-original-file: 2026-06-01/getDataPolicyManifest.json
 */
async function retrieveADataPolicyManifestByPolicyMode(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PolicyClient(credential);
  const result = await client.dataPolicyManifests.getByPolicyMode("Microsoft.KeyVault.Data");
  console.log(result);
}

async function main(): Promise<void> {
  await retrieveADataPolicyManifestByPolicyMode();
}

main().catch(console.error);
