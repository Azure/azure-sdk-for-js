// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Initiates the deletion of the shared private link resource from the search service.
 *
 * @summary Initiates the deletion of the shared private link resource from the search service.
 * x-ms-original-file: specification/search/resource-manager/Microsoft.Search/stable/2025-05-01/examples/DeleteSharedPrivateLinkResource.json
 */

import { SearchManagementClient } from "@azure/arm-search";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function sharedPrivateLinkResourceDelete(): Promise<void> {
  const subscriptionId = process.env["SEARCH_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["SEARCH_RESOURCE_GROUP"] || "rg1";
  const searchServiceName = "mysearchservice";
  const sharedPrivateLinkResourceName = "testResource";
  const credential = new DefaultAzureCredential();
  const client = new SearchManagementClient(credential, subscriptionId);
  const result = await client.sharedPrivateLinkResources.beginDeleteAndWait(
    resourceGroupName,
    searchServiceName,
    sharedPrivateLinkResourceName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await sharedPrivateLinkResourceDelete();
}

main().catch(console.error);
