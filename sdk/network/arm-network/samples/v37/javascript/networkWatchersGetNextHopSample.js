// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the next hop from the specified VM.
 *
 * @summary gets the next hop from the specified VM.
 * x-ms-original-file: 2025-05-01/NetworkWatcherNextHopGet.json
 */
async function getNextHop() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkWatchers.getNextHop("rg1", "nw1", {
    destinationIPAddress: "10.0.0.10",
    sourceIPAddress: "10.0.0.5",
    targetNicResourceId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/networkInterfaces/nic1",
    targetResourceId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg2/providers/Microsoft.Compute/virtualMachines/vm1",
  });
  console.log(result);
}

async function main() {
  await getNextHop();
}

main().catch(console.error);
