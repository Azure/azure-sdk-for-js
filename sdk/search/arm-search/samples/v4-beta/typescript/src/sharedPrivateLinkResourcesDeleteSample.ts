// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SearchManagementClient } from "@azure/arm-search";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to initiates the deletion of the shared private link resource from the search service.
 *
 * @summary initiates the deletion of the shared private link resource from the search service.
 * x-ms-original-file: 2025-05-01/DeleteSharedPrivateLinkResource.json
 */
async function sharedPrivateLinkResourceDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SearchManagementClient(credential, subscriptionId);
  await client.sharedPrivateLinkResources.delete("rg1", "mysearchservice", "testResource");
}

async function main(): Promise<void> {
  await sharedPrivateLinkResourceDelete();
}

main().catch(console.error);
