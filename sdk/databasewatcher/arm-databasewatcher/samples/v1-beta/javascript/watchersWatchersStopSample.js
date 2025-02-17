// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DatabaseWatcherClient } = require("@azure/arm-databasewatcher");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the action to stop monitoring all targets configured for a database watcher.
 *
 * @summary the action to stop monitoring all targets configured for a database watcher.
 * x-ms-original-file: 2025-01-02/Watchers_Stop_MaximumSet_Gen.json
 */
async function watchersStopMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "A76F9850-996B-40B3-94D4-C98110A0EEC9";
  const client = new DatabaseWatcherClient(credential, subscriptionId);
  await client.watchers.stop("rgWatcher", "myWatcher");
}

async function main() {
  await watchersStopMaximumSet();
}

main().catch(console.error);
