// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KeyVaultManagementClient } from "@azure/arm-keyvault";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the private link resources supported for the key vault.
 *
 * @summary gets the private link resources supported for the key vault.
 * x-ms-original-file: 2025-05-01/listPrivateLinkResources.json
 */
async function keyVaultListPrivateLinkResources(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new KeyVaultManagementClient(credential, subscriptionId);
  const result = await client.privateLinkResources.listByVault("sample-group", "sample-vault");
  console.log(result);
}

async function main(): Promise<void> {
  await keyVaultListPrivateLinkResources();
}

main().catch(console.error);
