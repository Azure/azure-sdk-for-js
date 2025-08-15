// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ResourceSyncRulesUpdateOptionalParams } from "@azure/arm-extendedlocation";
import { CustomLocationsManagementClient } from "@azure/arm-extendedlocation";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Updates a Resource Sync Rule with the specified Resource Sync Rule name in the specified Resource Group, Subscription and Custom Location name.
 *
 * @summary Updates a Resource Sync Rule with the specified Resource Sync Rule name in the specified Resource Group, Subscription and Custom Location name.
 * x-ms-original-file: specification/extendedlocation/resource-manager/Microsoft.ExtendedLocation/preview/2021-08-31-preview/examples/ResourceSyncRulesPatch.json
 */
async function updateResourceSyncRule(): Promise<void> {
  const subscriptionId =
    process.env["EXTENDEDLOCATION_SUBSCRIPTION_ID"] || "11111111-2222-3333-4444-555555555555";
  const resourceGroupName = process.env["EXTENDEDLOCATION_RESOURCE_GROUP"] || "testresourcegroup";
  const resourceName = "customLocation01";
  const childResourceName = "resourceSyncRule01";
  const tags = { tier: "testing" };
  const options: ResourceSyncRulesUpdateOptionalParams = { tags };
  const credential = new DefaultAzureCredential();
  const client = new CustomLocationsManagementClient(credential, subscriptionId);
  const result = await client.resourceSyncRules.beginUpdateAndWait(
    resourceGroupName,
    resourceName,
    childResourceName,
    options,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateResourceSyncRule();
}

main().catch(console.error);
