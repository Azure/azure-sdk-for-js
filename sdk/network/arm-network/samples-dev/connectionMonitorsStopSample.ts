// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to stops the specified connection monitor.
 *
 * @summary stops the specified connection monitor.
 * x-ms-original-file: 2025-05-01/NetworkWatcherConnectionMonitorStop.json
 */
async function stopConnectionMonitor(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.connectionMonitors.stop("rg1", "nw1", "cm1");
}

async function main(): Promise<void> {
  await stopConnectionMonitor();
}

main().catch(console.error);
