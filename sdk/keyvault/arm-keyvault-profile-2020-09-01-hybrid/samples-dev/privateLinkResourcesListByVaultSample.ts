// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the private link resources supported for the key vault.
 *
 * @summary Gets the private link resources supported for the key vault.
 * x-ms-original-file: specification/keyvault/resource-manager/Microsoft.KeyVault/stable/2019-09-01/examples/listPrivateLinkResources.json
 */

import { KeyVaultManagementClient } from "@azure/arm-keyvault-profile-2020-09-01-hybrid";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function keyVaultListPrivateLinkResources(): Promise<void> {
  const subscriptionId =
    process.env["KEYVAULT_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["KEYVAULT_RESOURCE_GROUP"] || "sample-group";
  const vaultName = "sample-vault";
  const credential = new DefaultAzureCredential();
  const client = new KeyVaultManagementClient(credential, subscriptionId);
  const result = await client.privateLinkResources.listByVault(resourceGroupName, vaultName);
  console.log(result);
}

async function main(): Promise<void> {
  await keyVaultListPrivateLinkResources();
}

main().catch(console.error);
