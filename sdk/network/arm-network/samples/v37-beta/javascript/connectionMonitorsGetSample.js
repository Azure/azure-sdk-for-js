// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a connection monitor by name.
 *
 * @summary gets a connection monitor by name.
 * x-ms-original-file: 2025-05-01/NetworkWatcherConnectionMonitorGet.json
 */
async function getConnectionMonitor() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.connectionMonitors.get("rg1", "nw1", "cm1");
  console.log(result);
}

async function main() {
  await getConnectionMonitor();
}

main().catch(console.error);
