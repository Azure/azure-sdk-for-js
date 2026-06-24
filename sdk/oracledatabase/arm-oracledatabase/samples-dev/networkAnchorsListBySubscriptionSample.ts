// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list NetworkAnchor resources by subscription ID
 *
 * @summary list NetworkAnchor resources by subscription ID
 * x-ms-original-file: 2025-09-01/NetworkAnchors_ListBySubscription_MaximumSet_Gen.json
 */
async function networkAnchorsListBySubscriptionMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.networkAnchors.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list NetworkAnchor resources by subscription ID
 *
 * @summary list NetworkAnchor resources by subscription ID
 * x-ms-original-file: 2025-09-01/NetworkAnchors_ListBySubscription_MinimumSet_Gen.json
 */
async function networkAnchorsListBySubscriptionMaximumSetGeneratedByMinimumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.networkAnchors.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await networkAnchorsListBySubscriptionMaximumSet();
  await networkAnchorsListBySubscriptionMaximumSetGeneratedByMinimumSetRule();
}

main().catch(console.error);
