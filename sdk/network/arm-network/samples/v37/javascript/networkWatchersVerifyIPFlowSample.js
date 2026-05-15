// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to verify IP flow from the specified VM to a location given the currently configured NSG rules.
 *
 * @summary verify IP flow from the specified VM to a location given the currently configured NSG rules.
 * x-ms-original-file: 2025-05-01/NetworkWatcherIpFlowVerify.json
 */
async function ipFlowVerify() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkWatchers.verifyIPFlow("rg1", "nw1", {
    direction: "Outbound",
    localIPAddress: "10.2.0.4",
    localPort: "80",
    remoteIPAddress: "121.10.1.1",
    remotePort: "80",
    targetResourceId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg2/providers/Microsoft.Compute/virtualMachines/vm1",
    protocol: "TCP",
  });
  console.log(result);
}

async function main() {
  await ipFlowVerify();
}

main().catch(console.error);
