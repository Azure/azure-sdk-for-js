// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SearchManagementClient } from "@azure/arm-search";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns the list of query API keys for the given Azure AI Search service.
 *
 * @summary returns the list of query API keys for the given Azure AI Search service.
 * x-ms-original-file: 2026-03-01-preview/SearchListQueryKeysBySearchService.json
 */
async function searchListQueryKeysBySearchService(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SearchManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.queryKeys.listBySearchService("rg1", "mysearchservice")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await searchListQueryKeysBySearchService();
}

main().catch(console.error);
