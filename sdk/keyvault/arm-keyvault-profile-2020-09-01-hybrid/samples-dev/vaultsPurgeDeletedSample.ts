// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KeyVaultManagementClient } from "@azure/arm-keyvault-profile-2020-09-01-hybrid";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Permanently deletes the specified vault. aka Purges the deleted Azure key vault.
 *
 * @summary Permanently deletes the specified vault. aka Purges the deleted Azure key vault.
 * x-ms-original-file: specification/keyvault/resource-manager/Microsoft.KeyVault/stable/2019-09-01/examples/purgeDeletedVault.json
 */
async function purgeADeletedVault(): Promise<void> {
  const subscriptionId =
    process.env["KEYVAULT_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const vaultName = "sample-vault";
  const location = "westus";
  const credential = new DefaultAzureCredential();
  const client = new KeyVaultManagementClient(credential, subscriptionId);
  const result = await client.vaults.beginPurgeDeletedAndWait(vaultName, location);
  console.log(result);
}

async function main(): Promise<void> {
  await purgeADeletedVault();
}

main().catch(console.error);
