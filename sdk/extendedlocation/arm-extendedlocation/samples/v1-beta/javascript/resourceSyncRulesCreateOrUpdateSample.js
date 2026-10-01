// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CustomLocationsManagementClient } = require("@azure/arm-extendedlocation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a Resource Sync Rule in the parent Custom Location, Subscription Id and Resource Group
 *
 * @summary creates or updates a Resource Sync Rule in the parent Custom Location, Subscription Id and Resource Group
 * x-ms-original-file: 2021-08-31-preview/ResourceSyncRulesCreate_Update.json
 */
async function createOrUpdateResourceSyncRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-2222-3333-4444-555555555555";
  const client = new CustomLocationsManagementClient(credential, subscriptionId);
  const result = await client.resourceSyncRules.createOrUpdate(
    "testresourcegroup",
    "customLocation01",
    "resourceSyncRule01",
    {
      location: "West US",
      priority: 999,
      selector: {
        matchExpressions: [{ key: "key4", operator: "In", values: ["value4"] }],
        matchLabels: { key1: "value1" },
      },
      targetResourceGroup:
        "/subscriptions/11111111-2222-3333-4444-555555555555/resourceGroups/testresourcegroup",
    },
  );
  console.log(result);
}

async function main() {
  await createOrUpdateResourceSyncRule();
}

main().catch(console.error);
