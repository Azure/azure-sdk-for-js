// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HorizonDbClient } from "@azure/arm-horizondb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a default parameter group available for a subscription in a specific region. Each PostgreSQL version has at most one default parameter group in a location.
 *
 * @summary gets a default parameter group available for a subscription in a specific region. Each PostgreSQL version has at most one default parameter group in a location.
 * x-ms-original-file: 2026-10-01-preview/DefaultParameterGroups_Get.json
 */
async function getADefaultHorizonDBParameterGroupBySubscriptionLocationAndName(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const result = await client.defaultParameterGroups.get(
    "eastus2",
    "default-postgresql-17-provisioned",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getADefaultHorizonDBParameterGroupBySubscriptionLocationAndName();
}

main().catch(console.error);
