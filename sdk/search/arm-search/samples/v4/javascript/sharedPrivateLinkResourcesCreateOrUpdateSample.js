// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SearchManagementClient } = require("@azure/arm-search");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to initiates the creation or update of a shared private link resource managed by the search service in the given resource group.
 *
 * @summary initiates the creation or update of a shared private link resource managed by the search service in the given resource group.
 * x-ms-original-file: 2025-05-01/CreateOrUpdateSharedPrivateLinkResource.json
 */
async function sharedPrivateLinkResourceCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SearchManagementClient(credential, subscriptionId);
  const result = await client.sharedPrivateLinkResources.createOrUpdate(
    "rg1",
    "mysearchservice",
    "testResource",
    {
      properties: {
        groupId: "blob",
        privateLinkResourceId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Storage/storageAccounts/storageAccountName",
        requestMessage: "please approve",
      },
    },
  );
  console.log(result);
}

async function main() {
  await sharedPrivateLinkResourceCreateOrUpdate();
}

main().catch(console.error);
