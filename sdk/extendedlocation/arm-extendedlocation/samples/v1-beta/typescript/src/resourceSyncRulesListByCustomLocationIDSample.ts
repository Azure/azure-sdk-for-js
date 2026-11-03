// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CustomLocationsManagementClient } from "@azure/arm-extendedlocation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a list of Resource Sync Rules in the specified subscription. The operation returns properties of each Resource Sync Rule
 *
 * @summary gets a list of Resource Sync Rules in the specified subscription. The operation returns properties of each Resource Sync Rule
 * x-ms-original-file: 2021-08-31-preview/ResourceSyncRulesListByCustomLocationID.json
 */
async function listResourceSyncRulesBySubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-2222-3333-4444-555555555555";
  const client = new CustomLocationsManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.resourceSyncRules.listByCustomLocationID(
    "testresourcegroup",
    "customLocation01",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listResourceSyncRulesBySubscription();
}

main().catch(console.error);
