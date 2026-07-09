// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CustomLocationsManagementClient } from "@azure/arm-extendedlocation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates a Resource Sync Rule with the specified Resource Sync Rule name in the specified Resource Group, Subscription and Custom Location name.
 *
 * @summary updates a Resource Sync Rule with the specified Resource Sync Rule name in the specified Resource Group, Subscription and Custom Location name.
 * x-ms-original-file: 2021-08-31-preview/ResourceSyncRulesPatch.json
 */
async function updateResourceSyncRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-2222-3333-4444-555555555555";
  const client = new CustomLocationsManagementClient(credential, subscriptionId);
  const result = await client.resourceSyncRules.update(
    "testresourcegroup",
    "customLocation01",
    "resourceSyncRule01",
    {
      properties: {
        targetResourceGroup:
          "/subscriptions/11111111-2222-3333-4444-555555555555/resourceGroups/testrg/",
      },
      tags: { tier: "testing" },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateResourceSyncRule();
}

main().catch(console.error);
