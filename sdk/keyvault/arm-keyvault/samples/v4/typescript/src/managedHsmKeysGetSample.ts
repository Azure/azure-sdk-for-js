// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KeyVaultManagementClient } from "@azure/arm-keyvault";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the current version of the specified key from the specified managed HSM.
 *
 * @summary gets the current version of the specified key from the specified managed HSM.
 * x-ms-original-file: 2025-05-01/managedHsmGetKey.json
 */
async function getAKey(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new KeyVaultManagementClient(credential, subscriptionId);
  const result = await client.managedHsmKeys.get(
    "sample-group",
    "sample-managedhsm-name",
    "sample-key-name",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAKey();
}

main().catch(console.error);
