// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SearchManagementClient } = require("@azure/arm-search");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the details of the shared private link resource managed by the search service in the given resource group.
 *
 * @summary gets the details of the shared private link resource managed by the search service in the given resource group.
 * x-ms-original-file: 2025-05-01/GetSharedPrivateLinkResource.json
 */
async function sharedPrivateLinkResourceGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SearchManagementClient(credential, subscriptionId);
  const result = await client.sharedPrivateLinkResources.get(
    "rg1",
    "mysearchservice",
    "testResource",
  );
  console.log(result);
}

async function main() {
  await sharedPrivateLinkResourceGet();
}

main().catch(console.error);
