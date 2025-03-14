// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DatabaseWatcherClient } from "@azure/arm-databasewatcher";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the action to start monitoring all targets configured for a database watcher.
 *
 * @summary the action to start monitoring all targets configured for a database watcher.
 * x-ms-original-file: 2025-01-02/Watchers_Start_MaximumSet_Gen.json
 */
async function watchersStartMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "A76F9850-996B-40B3-94D4-C98110A0EEC9";
  const client = new DatabaseWatcherClient(credential, subscriptionId);
  await client.watchers.start("rgWatcher", "testWatcher");
}

async function main(): Promise<void> {
  await watchersStartMaximumSet();
}

main().catch(console.error);
