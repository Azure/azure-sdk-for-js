// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to disconnect vpn connections of virtual network gateway in the specified resource group.
 *
 * @summary disconnect vpn connections of virtual network gateway in the specified resource group.
 * x-ms-original-file: 2025-05-01/VirtualNetworkGatewaysDisconnectP2sVpnConnections.json
 */
async function disconnectVpnConnectionsFromVirtualNetworkGateway() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.virtualNetworkGateways.disconnectVirtualNetworkGatewayVpnConnections(
    "vpn-gateway-test",
    "vpngateway",
    { vpnConnectionIds: ["vpnconnId1", "vpnconnId2"] },
  );
}

async function main() {
  await disconnectVpnConnectionsFromVirtualNetworkGateway();
}

main().catch(console.error);
