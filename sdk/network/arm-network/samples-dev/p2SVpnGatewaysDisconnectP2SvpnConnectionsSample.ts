// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Disconnect P2S vpn connections of the virtual wan P2SVpnGateway in the specified resource group.
 *
 * @summary Disconnect P2S vpn connections of the virtual wan P2SVpnGateway in the specified resource group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2024-07-01/examples/P2sVpnGatewaysDisconnectP2sVpnConnections.json
 */

import type {
  P2SVpnConnectionRequest} from "@azure/arm-network";
import {
  NetworkManagementClient,
} from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function disconnectVpnConnectionsFromP2SVpnGateway(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName =
    process.env["NETWORK_RESOURCE_GROUP"] || "p2s-vpn-gateway-test";
  const p2SVpnGatewayName = "p2svpngateway";
  const request: P2SVpnConnectionRequest = {
    vpnConnectionIds: ["vpnconnId1", "vpnconnId2"],
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result =
    await client.p2SVpnGateways.beginDisconnectP2SVpnConnectionsAndWait(
      resourceGroupName,
      p2SVpnGatewayName,
      request,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await disconnectVpnConnectionsFromP2SVpnGateway();
}

main().catch(console.error);
