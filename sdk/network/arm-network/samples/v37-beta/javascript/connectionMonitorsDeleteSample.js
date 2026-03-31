// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the specified connection monitor.
 *
 * @summary deletes the specified connection monitor.
 * x-ms-original-file: 2025-05-01/NetworkWatcherConnectionMonitorDelete.json
 */
async function deleteConnectionMonitor() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.connectionMonitors.delete("rg1", "nw1", "cm1");
}

async function main() {
  await deleteConnectionMonitor();
}

main().catch(console.error);
