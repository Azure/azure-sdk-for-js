// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Stops the specified connection monitor.
 *
 * @summary Stops the specified connection monitor.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/NetworkWatcherConnectionMonitorStop.json
 */
async function stopConnectionMonitor(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const networkWatcherName = "nw1";
  const connectionMonitorName = "cm1";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.connectionMonitors.beginStopAndWait(
    resourceGroupName,
    networkWatcherName,
    connectionMonitorName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await stopConnectionMonitor();
}

main().catch(console.error);
