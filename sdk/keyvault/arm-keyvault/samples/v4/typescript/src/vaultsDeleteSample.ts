// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KeyVaultManagementClient } from "@azure/arm-keyvault";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the specified Azure key vault.
 *
 * @summary deletes the specified Azure key vault.
 * x-ms-original-file: 2025-05-01/deleteVault.json
 */
async function deleteAVault(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new KeyVaultManagementClient(credential, subscriptionId);
  await client.vaults.delete("sample-resource-group", "sample-vault");
}

async function main(): Promise<void> {
  await deleteAVault();
}

main().catch(console.error);
