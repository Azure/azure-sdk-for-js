// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates a network watcher tags.
 *
 * @summary updates a network watcher tags.
 * x-ms-original-file: 2025-05-01/NetworkWatcherUpdateTags.json
 */
async function updateNetworkWatcherTags(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkWatchers.updateTags("rg1", "nw1", {
    tags: { tag1: "value1", tag2: "value2" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updateNetworkWatcherTags();
}

main().catch(console.error);
