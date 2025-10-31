// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KeyVaultManagementClient } from "@azure/arm-keyvault";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the deleted Azure key vault.
 *
 * @summary gets the deleted Azure key vault.
 * x-ms-original-file: 2025-05-01/getDeletedVault.json
 */
async function retrieveADeletedVault(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new KeyVaultManagementClient(credential, subscriptionId);
  const result = await client.vaults.getDeleted("westus", "sample-vault");
  console.log(result);
}

async function main(): Promise<void> {
  await retrieveADeletedVault();
}

main().catch(console.error);
