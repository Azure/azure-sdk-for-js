// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SearchManagementClient } = require("@azure/arm-search");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns the list of query API keys for the given Azure AI Search service.
 *
 * @summary returns the list of query API keys for the given Azure AI Search service.
 * x-ms-original-file: 2025-05-01/SearchListQueryKeysBySearchService.json
 */
async function searchListQueryKeysBySearchService() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SearchManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.queryKeys.listBySearchService("rg1", "mysearchservice")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await searchListQueryKeysBySearchService();
}

main().catch(console.error);
