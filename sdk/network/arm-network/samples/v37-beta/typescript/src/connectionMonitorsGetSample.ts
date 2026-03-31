// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a connection monitor by name.
 *
 * @summary gets a connection monitor by name.
 * x-ms-original-file: 2025-05-01/NetworkWatcherConnectionMonitorGet.json
 */
async function getConnectionMonitor(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.connectionMonitors.get("rg1", "nw1", "cm1");
  console.log(result);
}

async function main(): Promise<void> {
  await getConnectionMonitor();
}

main().catch(console.error);
