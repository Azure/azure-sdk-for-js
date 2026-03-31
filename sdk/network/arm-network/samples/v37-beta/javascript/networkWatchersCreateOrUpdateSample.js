// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a network watcher in the specified resource group.
 *
 * @summary creates or updates a network watcher in the specified resource group.
 * x-ms-original-file: 2025-05-01/NetworkWatcherCreate.json
 */
async function createNetworkWatcher() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkWatchers.createOrUpdate("rg1", "nw1", { location: "eastus" });
  console.log(result);
}

async function main() {
  await createNetworkWatcher();
}

main().catch(console.error);
