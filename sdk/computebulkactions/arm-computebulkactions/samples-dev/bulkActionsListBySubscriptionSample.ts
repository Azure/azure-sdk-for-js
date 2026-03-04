// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeBulkActionsClient } from "@azure/arm-computebulkactions";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list LaunchBulkInstancesOperation resources by subscriptionId.
 *
 * @summary list LaunchBulkInstancesOperation resources by subscriptionId.
 * x-ms-original-file: 2026-02-01-preview/BulkActions_ListBySubscription_MaximumSet_Gen.json
 */
async function bulkActionsListBySubscriptionGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "50352BBD-59F1-4EE2-BA9C-A6E51B0B1B2B";
  const client = new ComputeBulkActionsClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.bulkActions.listBySubscription("eastus2euap")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list LaunchBulkInstancesOperation resources by subscriptionId.
 *
 * @summary list LaunchBulkInstancesOperation resources by subscriptionId.
 * x-ms-original-file: 2026-02-01-preview/BulkActions_ListBySubscription_MinimumSet_Gen.json
 */
async function bulkActionsListBySubscriptionGeneratedByMinimumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "50352BBD-59F1-4EE2-BA9C-A6E51B0B1B2B";
  const client = new ComputeBulkActionsClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.bulkActions.listBySubscription("eastus2euap")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await bulkActionsListBySubscriptionGeneratedByMaximumSetRule();
  await bulkActionsListBySubscriptionGeneratedByMinimumSetRule();
}

main().catch(console.error);
