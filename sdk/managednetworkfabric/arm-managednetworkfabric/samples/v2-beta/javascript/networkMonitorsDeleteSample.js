// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ManagedNetworkFabricClient } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes layer 2 connectivity between compute nodes by managed by named NetworkMonitor name.
 *
 * @summary deletes layer 2 connectivity between compute nodes by managed by named NetworkMonitor name.
 * x-ms-original-file: 2024-06-15-preview/NetworkMonitors_Delete.json
 */
async function networkMonitorsDeleteMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  await client.networkMonitors.delete("rgmanagednetworkfabric", "example-monitor");
}

async function main() {
  await networkMonitorsDeleteMaximumSet();
}

main().catch(console.error);
