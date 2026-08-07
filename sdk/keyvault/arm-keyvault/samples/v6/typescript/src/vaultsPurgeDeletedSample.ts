// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KeyVaultManagementClient } from "@azure/arm-keyvault";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to permanently deletes the specified vault. aka Purges the deleted Azure key vault.
 *
 * @summary permanently deletes the specified vault. aka Purges the deleted Azure key vault.
 * x-ms-original-file: 2026-03-01-preview/purgeDeletedVault.json
 */
async function purgeADeletedVault(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new KeyVaultManagementClient(credential, subscriptionId);
  await client.vaults.purgeDeleted("sample-vault", "westus");
}

async function main(): Promise<void> {
  await purgeADeletedVault();
}

main().catch(console.error);
