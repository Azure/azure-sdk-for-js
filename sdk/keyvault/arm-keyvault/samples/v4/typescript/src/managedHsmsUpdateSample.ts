// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KeyVaultManagementClient } from "@azure/arm-keyvault";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a managed HSM Pool in the specified subscription.
 *
 * @summary update a managed HSM Pool in the specified subscription.
 * x-ms-original-file: 2025-05-01/ManagedHsm_Update.json
 */
async function updateAnExistingManagedHSMPool(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new KeyVaultManagementClient(credential, subscriptionId);
  const result = await client.managedHsms.update("hsm-group", "hsm1", {
    tags: { Dept: "hsm", Environment: "dogfood", Slice: "A" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updateAnExistingManagedHSMPool();
}

main().catch(console.error);
