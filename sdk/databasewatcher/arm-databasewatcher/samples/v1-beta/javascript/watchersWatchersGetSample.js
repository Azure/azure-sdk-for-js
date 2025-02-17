// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DatabaseWatcherClient } = require("@azure/arm-databasewatcher");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a Watcher
 *
 * @summary get a Watcher
 * x-ms-original-file: 2025-01-02/Watchers_Get_MaximumSet_Gen.json
 */
async function watchersGetMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "A76F9850-996B-40B3-94D4-C98110A0EEC9";
  const client = new DatabaseWatcherClient(credential, subscriptionId);
  const result = await client.watchers.get("rgWatcher", "myWatcher");
  console.log(result);
}

async function main() {
  await watchersGetMaximumSet();
}

main().catch(console.error);
