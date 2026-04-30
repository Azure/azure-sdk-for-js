// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Disconnect P2S vpn connections of the virtual wan P2SVpnGateway in the specified resource group.
 *
 * @summary Disconnect P2S vpn connections of the virtual wan P2SVpnGateway in the specified resource group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/P2sVpnGatewaysDisconnectP2sVpnConnections.json
 */
async function disconnectVpnConnectionsFromP2SVpnGateway() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "p2s-vpn-gateway-test";
  const p2SVpnGatewayName = "p2svpngateway";
  const request = {
    vpnConnectionIds: ["vpnconnId1", "vpnconnId2"],
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.p2SVpnGateways.beginDisconnectP2SVpnConnectionsAndWait(
    resourceGroupName,
    p2SVpnGatewayName,
    request,
  );
  console.log(result);
}

async function main() {
  await disconnectVpnConnectionsFromP2SVpnGateway();
}

main().catch(console.error);
