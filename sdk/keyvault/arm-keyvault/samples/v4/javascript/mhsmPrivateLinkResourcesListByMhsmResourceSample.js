// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { KeyVaultManagementClient } = require("@azure/arm-keyvault");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the private link resources supported for the managed hsm pool.
 *
 * @summary gets the private link resources supported for the managed hsm pool.
 * x-ms-original-file: 2025-05-01/ManagedHsm_listPrivateLinkResources.json
 */
async function keyVaultListPrivateLinkResources() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new KeyVaultManagementClient(credential, subscriptionId);
  const result = await client.mhsmPrivateLinkResources.listByMhsmResource(
    "sample-group",
    "sample-mhsm",
  );
  console.log(result);
}

async function main() {
  await keyVaultListPrivateLinkResources();
}

main().catch(console.error);
