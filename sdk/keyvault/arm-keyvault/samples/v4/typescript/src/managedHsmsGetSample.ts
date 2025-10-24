// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KeyVaultManagementClient } from "@azure/arm-keyvault";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the specified managed HSM Pool.
 *
 * @summary gets the specified managed HSM Pool.
 * x-ms-original-file: 2025-05-01/ManagedHsm_Get.json
 */
async function retrieveAManagedHSMPool(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new KeyVaultManagementClient(credential, subscriptionId);
  const result = await client.managedHsms.get("hsm-group", "hsm1");
  console.log(result);
}

async function main(): Promise<void> {
  await retrieveAManagedHSMPool();
}

main().catch(console.error);
