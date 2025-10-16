// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KeyVaultManagementClient } from "@azure/arm-keyvault";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to permanently deletes the specified managed HSM.
 *
 * @summary permanently deletes the specified managed HSM.
 * x-ms-original-file: 2025-05-01/DeletedManagedHsm_Purge.json
 */
async function purgeAManagedHSMPool(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new KeyVaultManagementClient(credential, subscriptionId);
  await client.managedHsms.purgeDeleted("westus", "hsm1");
}

async function main(): Promise<void> {
  await purgeAManagedHSMPool();
}

main().catch(console.error);
