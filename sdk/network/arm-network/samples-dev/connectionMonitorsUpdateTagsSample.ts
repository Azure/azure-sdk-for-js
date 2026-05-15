// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update tags of the specified connection monitor.
 *
 * @summary update tags of the specified connection monitor.
 * x-ms-original-file: 2025-05-01/NetworkWatcherConnectionMonitorUpdateTags.json
 */
async function updateConnectionMonitorTags(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.connectionMonitors.updateTags("rg1", "nw1", "cm1", {
    tags: { tag1: "value1", tag2: "value2" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updateConnectionMonitorTags();
}

main().catch(console.error);
