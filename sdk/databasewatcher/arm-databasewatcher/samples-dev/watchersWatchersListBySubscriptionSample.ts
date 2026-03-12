// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to list Watcher resources by subscription ID
 *
 * @summary list Watcher resources by subscription ID
 * x-ms-original-file: 2025-01-02/Watchers_ListBySubscription_MaximumSet_Gen.json
 */

import { DatabaseWatcherClient } from "@azure/arm-databasewatcher";
import { DefaultAzureCredential } from "@azure/identity";

async function watchersListBySubscriptionMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "A76F9850-996B-40B3-94D4-C98110A0EEC9";
  const client = new DatabaseWatcherClient(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.watchers.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await watchersListBySubscriptionMaximumSet();
}

main().catch(console.error);
