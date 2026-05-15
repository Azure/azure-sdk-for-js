// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to verifies the possibility of establishing a direct TCP connection from a virtual machine to a given endpoint including another VM or an arbitrary remote server.
 *
 * @summary verifies the possibility of establishing a direct TCP connection from a virtual machine to a given endpoint including another VM or an arbitrary remote server.
 * x-ms-original-file: 2025-05-01/NetworkWatcherConnectivityCheck.json
 */
async function checkConnectivity(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkWatchers.checkConnectivity("rg1", "nw1", {
    destination: { address: "192.168.100.4", port: 3389 },
    preferredIPVersion: "IPv4",
    source: {
      resourceId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg2/providers/Microsoft.Compute/virtualMachines/vm1",
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await checkConnectivity();
}

main().catch(console.error);
