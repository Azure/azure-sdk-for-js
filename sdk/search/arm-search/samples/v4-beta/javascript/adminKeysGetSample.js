// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SearchManagementClient } = require("@azure/arm-search");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the primary and secondary admin API keys for the specified Azure AI Search service.
 *
 * @summary gets the primary and secondary admin API keys for the specified Azure AI Search service.
 * x-ms-original-file: 2026-03-01-preview/SearchGetAdminKeys.json
 */
async function searchGetAdminKeys() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SearchManagementClient(credential, subscriptionId);
  const result = await client.adminKeys.get("rg1", "mysearchservice");
  console.log(result);
}

async function main() {
  await searchGetAdminKeys();
}

main().catch(console.error);
