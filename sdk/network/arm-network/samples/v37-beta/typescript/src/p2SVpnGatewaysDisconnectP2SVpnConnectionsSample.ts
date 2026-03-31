// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to disconnect P2S vpn connections of the virtual wan P2SVpnGateway in the specified resource group.
 *
 * @summary disconnect P2S vpn connections of the virtual wan P2SVpnGateway in the specified resource group.
 * x-ms-original-file: 2025-05-01/P2sVpnGatewaysDisconnectP2sVpnConnections.json
 */
async function disconnectVpnConnectionsFromP2SVpnGateway(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.p2SVpnGateways.disconnectP2SVpnConnections("p2s-vpn-gateway-test", "p2svpngateway", {
    vpnConnectionIds: ["vpnconnId1", "vpnconnId2"],
  });
}

async function main(): Promise<void> {
  await disconnectVpnConnectionsFromP2SVpnGateway();
}

main().catch(console.error);
