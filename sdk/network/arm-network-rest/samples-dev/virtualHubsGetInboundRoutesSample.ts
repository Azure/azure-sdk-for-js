// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the inbound routes configured for the Virtual Hub on a particular connection.
 *
 * @summary Gets the inbound routes configured for the Virtual Hub on a particular connection.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/GetInboundRoutes.json
 */

import type { VirtualHubsGetInboundRoutesParameters } from "@azure-rest/arm-network";
import createNetworkManagementClient, { getLongRunningPoller } from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function inboundRoutesForTheVirtualHubOnAParticularConnection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const virtualHubName = "virtualHub1";
  const options: VirtualHubsGetInboundRoutesParameters = {
    body: {
      connectionType: "ExpressRouteConnection",
      resourceUri:
        "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/expressRouteGateways/exrGw1/expressRouteConnections/exrConn1",
    },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualHubs/{virtualHubName}/inboundRoutes",
      subscriptionId,
      resourceGroupName,
      virtualHubName,
    )
    .post(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

inboundRoutesForTheVirtualHubOnAParticularConnection().catch(console.error);
