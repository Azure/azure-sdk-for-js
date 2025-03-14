// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DatabaseWatcherClient } from "@azure/arm-databasewatcher";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list SharedPrivateLinkResource resources by Watcher
 *
 * @summary list SharedPrivateLinkResource resources by Watcher
 * x-ms-original-file: 2025-01-02/SharedPrivateLinkResources_ListByWatcher_MaximumSet_Gen.json
 */
async function sharedPrivateLinkResourcesListByWatcherMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "49e0fbd3-75e8-44e7-96fd-5b64d9ad818d";
  const client = new DatabaseWatcherClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.sharedPrivateLinkResources.listByWatcher(
    "apiTest-ddat4p",
    "databasemo3ej9ih",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await sharedPrivateLinkResourcesListByWatcherMaximumSet();
}

main().catch(console.error);
