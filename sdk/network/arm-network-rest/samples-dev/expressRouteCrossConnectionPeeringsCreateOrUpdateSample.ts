// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates or updates a peering in the specified ExpressRouteCrossConnection.
 *
 * @summary Creates or updates a peering in the specified ExpressRouteCrossConnection.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/ExpressRouteCrossConnectionBgpPeeringCreate.json
 */

import type { ExpressRouteCrossConnectionPeeringsCreateOrUpdateParameters } from "@azure-rest/arm-network";
import createNetworkManagementClient, { getLongRunningPoller } from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function expressRouteCrossConnectionBgpPeeringCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "CrossConnection-SiliconValley";
  const crossConnectionName = "<circuitServiceKey>";
  const peeringName = "AzurePrivatePeering";
  const options: ExpressRouteCrossConnectionPeeringsCreateOrUpdateParameters = {
    body: {
      properties: {
        ipv6PeeringConfig: {
          primaryPeerAddressPrefix: "3FFE:FFFF:0:CD30::/126",
          secondaryPeerAddressPrefix: "3FFE:FFFF:0:CD30::4/126",
        },
        peerASN: 200,
        primaryPeerAddressPrefix: "192.168.16.252/30",
        secondaryPeerAddressPrefix: "192.168.18.252/30",
        vlanId: 200,
      },
    },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteCrossConnections/{crossConnectionName}/peerings/{peeringName}",
      subscriptionId,
      resourceGroupName,
      crossConnectionName,
      peeringName,
    )
    .put(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

expressRouteCrossConnectionBgpPeeringCreate().catch(console.error);
