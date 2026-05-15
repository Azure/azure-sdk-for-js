// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a network watcher in the specified resource group.
 *
 * @summary creates or updates a network watcher in the specified resource group.
 * x-ms-original-file: 2025-05-01/NetworkWatcherCreate.json
 */
async function createNetworkWatcher(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkWatchers.createOrUpdate("rg1", "nw1", { location: "eastus" });
  console.log(result);
}

async function main(): Promise<void> {
  await createNetworkWatcher();
}

main().catch(console.error);
