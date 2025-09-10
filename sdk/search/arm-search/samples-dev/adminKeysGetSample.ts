// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the primary and secondary admin API keys for the specified Azure AI Search service.
 *
 * @summary Gets the primary and secondary admin API keys for the specified Azure AI Search service.
 * x-ms-original-file: specification/search/resource-manager/Microsoft.Search/stable/2025-05-01/examples/SearchGetAdminKeys.json
 */

import { SearchManagementClient } from "@azure/arm-search";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function searchGetAdminKeys(): Promise<void> {
  const subscriptionId = process.env["SEARCH_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["SEARCH_RESOURCE_GROUP"] || "rg1";
  const searchServiceName = "mysearchservice";
  const credential = new DefaultAzureCredential();
  const client = new SearchManagementClient(credential, subscriptionId);
  const result = await client.adminKeys.get(
    resourceGroupName,
    searchServiceName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await searchGetAdminKeys();
}

main().catch(console.error);
