// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SearchManagementClient } = require("@azure/arm-search");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a search service in the given resource group, along with its associated resources.
 *
 * @summary deletes a search service in the given resource group, along with its associated resources.
 * x-ms-original-file: 2025-05-01/SearchDeleteService.json
 */
async function searchDeleteService() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SearchManagementClient(credential, subscriptionId);
  await client.services.delete("rg1", "mysearchservice");
}

async function main() {
  await searchDeleteService();
}

main().catch(console.error);
