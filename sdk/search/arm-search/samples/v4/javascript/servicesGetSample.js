// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SearchManagementClient } = require("@azure/arm-search");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the search service with the given name in the given resource group.
 *
 * @summary gets the search service with the given name in the given resource group.
 * x-ms-original-file: 2025-05-01/SearchGetService.json
 */
async function searchGetService() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SearchManagementClient(credential, subscriptionId);
  const result = await client.services.get("rg1", "mysearchservice");
  console.log(result);
}

async function main() {
  await searchGetService();
}

main().catch(console.error);
