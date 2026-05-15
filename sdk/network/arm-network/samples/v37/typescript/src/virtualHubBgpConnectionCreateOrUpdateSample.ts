// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates a VirtualHubBgpConnection resource if it doesn't exist else updates the existing VirtualHubBgpConnection.
 *
 * @summary creates a VirtualHubBgpConnection resource if it doesn't exist else updates the existing VirtualHubBgpConnection.
 * x-ms-original-file: 2025-05-01/VirtualHubBgpConnectionPut.json
 */
async function virtualHubRouteTableV2Put(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualHubBgpConnection.createOrUpdate("rg1", "hub1", "conn1", {
    hubVirtualNetworkConnection: {
      id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualHubs/hub1/hubVirtualNetworkConnections/hubVnetConn1",
    },
    peerAsn: 20000,
    peerIp: "192.168.1.5",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await virtualHubRouteTableV2Put();
}

main().catch(console.error);
