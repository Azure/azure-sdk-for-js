// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the specified network watcher resource.
 *
 * @summary deletes the specified network watcher resource.
 * x-ms-original-file: 2025-05-01/NetworkWatcherDelete.json
 */
async function deleteNetworkWatcher(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.networkWatchers.delete("rg1", "nw1");
}

async function main(): Promise<void> {
  await deleteNetworkWatcher();
}

main().catch(console.error);
