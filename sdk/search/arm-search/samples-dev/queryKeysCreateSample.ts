// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Generates a new query key for the specified search service. You can create up to 50 query keys per service.
 *
 * @summary Generates a new query key for the specified search service. You can create up to 50 query keys per service.
 * x-ms-original-file: specification/search/resource-manager/Microsoft.Search/stable/2025-05-01/examples/SearchCreateQueryKey.json
 */

import { SearchManagementClient } from "@azure/arm-search";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function searchCreateQueryKey(): Promise<void> {
  const subscriptionId = process.env["SEARCH_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["SEARCH_RESOURCE_GROUP"] || "rg1";
  const searchServiceName = "mysearchservice";
  const name =
    "An API key granting read-only access to the documents collection of an index.";
  const credential = new DefaultAzureCredential();
  const client = new SearchManagementClient(credential, subscriptionId);
  const result = await client.queryKeys.create(
    resourceGroupName,
    searchServiceName,
    name,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await searchCreateQueryKey();
}

main().catch(console.error);
