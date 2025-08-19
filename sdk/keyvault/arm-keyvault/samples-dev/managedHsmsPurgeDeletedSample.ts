// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Permanently deletes the specified managed HSM.
 *
 * @summary Permanently deletes the specified managed HSM.
 * x-ms-original-file: specification/keyvault/resource-manager/Microsoft.KeyVault/stable/2024-11-01/examples/DeletedManagedHsm_Purge.json
 */

import { KeyVaultManagementClient } from "@azure/arm-keyvault";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function purgeAManagedHsmPool(): Promise<void> {
  const subscriptionId =
    process.env["KEYVAULT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const name = "hsm1";
  const location = "westus";
  const credential = new DefaultAzureCredential();
  const client = new KeyVaultManagementClient(credential, subscriptionId);
  const result = await client.managedHsms.beginPurgeDeletedAndWait(
    name,
    location,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await purgeAManagedHsmPool();
}

main().catch(console.error);
