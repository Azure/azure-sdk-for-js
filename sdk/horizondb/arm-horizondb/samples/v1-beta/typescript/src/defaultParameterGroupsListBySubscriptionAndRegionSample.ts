// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HorizonDbClient } from "@azure/arm-horizondb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists default parameter groups available for a subscription in a specific region. The response contains at most one default parameter group for each PostgreSQL version.
 *
 * @summary lists default parameter groups available for a subscription in a specific region. The response contains at most one default parameter group for each PostgreSQL version.
 * x-ms-original-file: 2026-10-01-preview/DefaultParameterGroups_List.json
 */
async function listDefaultHorizonDBParameterGroupsBySubscriptionAndRegion(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.defaultParameterGroups.listBySubscriptionAndRegion("eastus2")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listDefaultHorizonDBParameterGroupsBySubscriptionAndRegion();
}

main().catch(console.error);
