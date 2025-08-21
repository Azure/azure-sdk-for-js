// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Disconnect vpn connections of virtual network gateway in the specified resource group.
 *
 * @summary Disconnect vpn connections of virtual network gateway in the specified resource group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/VirtualNetworkGatewaysDisconnectP2sVpnConnections.json
 */

import type { VirtualNetworkGatewaysDisconnectVirtualNetworkGatewayVpnConnectionsParameters } from "@azure-rest/arm-network";
import createNetworkManagementClient, { getLongRunningPoller } from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function disconnectVpnConnectionsFromVirtualNetworkGateway(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "vpn-gateway-test";
  const virtualNetworkGatewayName = "vpngateway";
  const options: VirtualNetworkGatewaysDisconnectVirtualNetworkGatewayVpnConnectionsParameters = {
    body: { vpnConnectionIds: ["vpnconnId1", "vpnconnId2"] },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworkGateways/{virtualNetworkGatewayName}/disconnectVirtualNetworkGatewayVpnConnections",
      subscriptionId,
      resourceGroupName,
      virtualNetworkGatewayName,
    )
    .post(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

disconnectVpnConnectionsFromVirtualNetworkGateway().catch(console.error);
