// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DatabaseWatcherClient } = require("@azure/arm-databasewatcher");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the action to start monitoring all targets configured for a database watcher.
 *
 * @summary the action to start monitoring all targets configured for a database watcher.
 * x-ms-original-file: 2025-01-02/Watchers_Start_MaximumSet_Gen.json
 */
async function watchersStartMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "A76F9850-996B-40B3-94D4-C98110A0EEC9";
  const client = new DatabaseWatcherClient(credential, subscriptionId);
  await client.watchers.start("rgWatcher", "testWatcher");
}

async function main() {
  await watchersStartMaximumSet();
}

main().catch(console.error);
