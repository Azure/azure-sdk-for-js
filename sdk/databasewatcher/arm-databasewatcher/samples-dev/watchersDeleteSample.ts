// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DatabaseWatcherClient } from "@azure/arm-databasewatcher";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a Watcher
 *
 * @summary delete a Watcher
 * x-ms-original-file: 2025-01-02/Watchers_Delete_MaximumSet_Gen.json
 */
async function watchersDeleteMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "A76F9850-996B-40B3-94D4-C98110A0EEC9";
  const client = new DatabaseWatcherClient(credential, subscriptionId);
  await client.watchers.delete("rgWatcher", "testWatcher");
}

async function main(): Promise<void> {
  await watchersDeleteMaximumSet();
}

main().catch(console.error);
