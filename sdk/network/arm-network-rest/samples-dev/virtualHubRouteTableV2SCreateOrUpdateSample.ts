// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates a VirtualHubRouteTableV2 resource if it doesn't exist else updates the existing VirtualHubRouteTableV2.
 *
 * @summary Creates a VirtualHubRouteTableV2 resource if it doesn't exist else updates the existing VirtualHubRouteTableV2.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/VirtualHubRouteTableV2Put.json
 */

import type { VirtualHubRouteTableV2SCreateOrUpdateParameters } from "@azure-rest/arm-network";
import createNetworkManagementClient, { getLongRunningPoller } from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function virtualHubRouteTableV2Put(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const virtualHubName = "virtualHub1";
  const routeTableName = "virtualHubRouteTable1a";
  const options: VirtualHubRouteTableV2SCreateOrUpdateParameters = {
    body: {
      properties: {
        attachedConnections: ["All_Vnets"],
        routes: [
          {
            destinationType: "CIDR",
            destinations: ["20.10.0.0/16", "20.20.0.0/16"],
            nextHopType: "IPAddress",
            nextHops: ["10.0.0.68"],
          },
          {
            destinationType: "CIDR",
            destinations: ["0.0.0.0/0"],
            nextHopType: "IPAddress",
            nextHops: ["10.0.0.68"],
          },
        ],
      },
    },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualHubs/{virtualHubName}/routeTables/{routeTableName}",
      subscriptionId,
      resourceGroupName,
      virtualHubName,
      routeTableName,
    )
    .put(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

virtualHubRouteTableV2Put().catch(console.error);
