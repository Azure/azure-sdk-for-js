// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Verifies the possibility of establishing a direct TCP connection from a virtual machine to a given endpoint including another VM or an arbitrary remote server.
 *
 * @summary Verifies the possibility of establishing a direct TCP connection from a virtual machine to a given endpoint including another VM or an arbitrary remote server.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/NetworkWatcherConnectivityCheck.json
 */
async function checkConnectivity() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const networkWatcherName = "nw1";
  const parameters = {
    destination: { address: "192.168.100.4", port: 3389 },
    preferredIPVersion: "IPv4",
    source: {
      resourceId:
        "/subscriptions/subid/resourceGroups/rg2/providers/Microsoft.Compute/virtualMachines/vm1",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkWatchers.beginCheckConnectivityAndWait(
    resourceGroupName,
    networkWatcherName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await checkConnectivity();
}

main().catch(console.error);
