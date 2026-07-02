// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CustomLocationsManagementClient } from "@azure/arm-extendedlocation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the details of the resourceSyncRule with a specified resource group, subscription id Custom Location resource name and Resource Sync Rule name.
 *
 * @summary gets the details of the resourceSyncRule with a specified resource group, subscription id Custom Location resource name and Resource Sync Rule name.
 * x-ms-original-file: 2021-08-31-preview/ResourceSyncRulesGet.json
 */
async function getCustomLocation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-2222-3333-4444-555555555555";
  const client = new CustomLocationsManagementClient(credential, subscriptionId);
  const result = await client.resourceSyncRules.get(
    "testresourcegroup",
    "customLocation01",
    "resourceSyncRule01",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getCustomLocation();
}

main().catch(console.error);
