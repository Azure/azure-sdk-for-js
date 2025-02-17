// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DatabaseWatcherClient } from "@azure/arm-databasewatcher";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list Watcher resources by resource group
 *
 * @summary list Watcher resources by resource group
 * x-ms-original-file: 2025-01-02/Watchers_ListByResourceGroup_MaximumSet_Gen.json
 */
async function watchersListByResourceGroupMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "A76F9850-996B-40B3-94D4-C98110A0EEC9";
  const client = new DatabaseWatcherClient(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.watchers.listByResourceGroup("rgWatcher")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await watchersListByResourceGroupMaximumSet();
}

main().catch(console.error);
