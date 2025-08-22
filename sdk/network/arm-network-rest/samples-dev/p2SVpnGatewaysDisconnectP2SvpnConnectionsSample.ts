// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Disconnect P2S vpn connections of the virtual wan P2SVpnGateway in the specified resource group.
 *
 * @summary Disconnect P2S vpn connections of the virtual wan P2SVpnGateway in the specified resource group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/P2sVpnGatewaysDisconnectP2sVpnConnections.json
 */

import type { P2SVpnGatewaysDisconnectP2SVpnConnectionsParameters } from "@azure-rest/arm-network";
import createNetworkManagementClient, { getLongRunningPoller } from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function disconnectVpnConnectionsFromP2SVpnGateway(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "p2s-vpn-gateway-test";
  const p2sVpnGatewayName = "p2svpngateway";
  const options: P2SVpnGatewaysDisconnectP2SVpnConnectionsParameters = {
    body: { vpnConnectionIds: ["vpnconnId1", "vpnconnId2"] },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/p2svpnGateways/{p2sVpnGatewayName}/disconnectP2sVpnConnections",
      subscriptionId,
      resourceGroupName,
      p2sVpnGatewayName,
    )
    .post(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

disconnectVpnConnectionsFromP2SVpnGateway().catch(console.error);
