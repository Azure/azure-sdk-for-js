// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Disconnect vpn connections of virtual network gateway in the specified resource group.
 *
 * @summary Disconnect vpn connections of virtual network gateway in the specified resource group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/VirtualNetworkGatewaysDisconnectP2sVpnConnections.json
 */
async function disconnectVpnConnectionsFromVirtualNetworkGateway() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "vpn-gateway-test";
  const virtualNetworkGatewayName = "vpngateway";
  const request = {
    vpnConnectionIds: ["vpnconnId1", "vpnconnId2"],
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result =
    await client.virtualNetworkGateways.beginDisconnectVirtualNetworkGatewayVpnConnectionsAndWait(
      resourceGroupName,
      virtualNetworkGatewayName,
      request,
    );
  console.log(result);
}

async function main() {
  await disconnectVpnConnectionsFromVirtualNetworkGateway();
}

main().catch(console.error);
