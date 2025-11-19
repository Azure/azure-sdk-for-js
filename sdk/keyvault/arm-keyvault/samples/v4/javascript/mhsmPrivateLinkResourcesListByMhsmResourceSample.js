// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { KeyVaultManagementClient } = require("@azure/arm-keyvault");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets the private link resources supported for the managed hsm pool.
 *
 * @summary Gets the private link resources supported for the managed hsm pool.
 * x-ms-original-file: specification/keyvault/resource-manager/Microsoft.KeyVault/stable/2025-05-01/examples/ManagedHsm_listPrivateLinkResources.json
 */
async function keyVaultListPrivateLinkResources() {
  const subscriptionId =
    process.env["KEYVAULT_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["KEYVAULT_RESOURCE_GROUP"] || "sample-group";
  const name = "sample-mhsm";
  const credential = new DefaultAzureCredential();
  const client = new KeyVaultManagementClient(credential, subscriptionId);
  const result = await client.mhsmPrivateLinkResources.listByMhsmResource(resourceGroupName, name);
  console.log(result);
}

async function main() {
  await keyVaultListPrivateLinkResources();
}

main().catch(console.error);
