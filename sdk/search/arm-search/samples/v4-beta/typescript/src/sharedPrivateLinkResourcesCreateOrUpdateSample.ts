// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SearchManagementClient } from "@azure/arm-search";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to initiates the creation or update of a shared private link resource managed by the search service in the given resource group.
 *
 * @summary initiates the creation or update of a shared private link resource managed by the search service in the given resource group.
 * x-ms-original-file: 2026-03-01-preview/CreateOrUpdateSharedPrivateLinkResource.json
 */
async function sharedPrivateLinkResourceCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SearchManagementClient(credential, subscriptionId);
  const result = await client.sharedPrivateLinkResources.createOrUpdate(
    "rg1",
    "mysearchservice",
    "testResource",
    {
      properties: {
        requestMessage: "please approve",
        groupId: "blob",
        privateLinkResourceId:
          "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Storage/storageAccounts/storageAccountName",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await sharedPrivateLinkResourceCreateOrUpdate();
}

main().catch(console.error);
