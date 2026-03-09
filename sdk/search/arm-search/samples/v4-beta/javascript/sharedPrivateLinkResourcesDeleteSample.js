// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SearchManagementClient } = require("@azure/arm-search");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to initiates the deletion of the shared private link resource from the search service.
 *
 * @summary initiates the deletion of the shared private link resource from the search service.
 * x-ms-original-file: 2025-05-01/DeleteSharedPrivateLinkResource.json
 */
async function sharedPrivateLinkResourceDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SearchManagementClient(credential, subscriptionId);
  await client.sharedPrivateLinkResources.delete("rg1", "mysearchservice", "testResource");
}

async function main() {
  await sharedPrivateLinkResourceDelete();
}

main().catch(console.error);
