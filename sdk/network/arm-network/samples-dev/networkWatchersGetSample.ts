// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the specified network watcher by resource group.
 *
 * @summary gets the specified network watcher by resource group.
 * x-ms-original-file: 2025-05-01/NetworkWatcherGet.json
 */
async function getNetworkWatcher(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkWatchers.get("rg1", "nw1");
  console.log(result);
}

async function main(): Promise<void> {
  await getNetworkWatcher();
}

main().catch(console.error);
