// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates a hub virtual network connection if it doesn't exist else updates the existing one.
 *
 * @summary Creates a hub virtual network connection if it doesn't exist else updates the existing one.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/HubVirtualNetworkConnectionPut.json
 */

import type { HubVirtualNetworkConnectionsCreateOrUpdateParameters } from "@azure-rest/arm-network";
import createNetworkManagementClient, { getLongRunningPoller } from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function hubVirtualNetworkConnectionPut(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const virtualHubName = "virtualHub1";
  const connectionName = "connection1";
  const options: HubVirtualNetworkConnectionsCreateOrUpdateParameters = {
    body: {
      properties: {
        enableInternetSecurity: false,
        remoteVirtualNetwork: {
          id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/SpokeVnet1",
        },
        routingConfiguration: {
          associatedRouteTable: {
            id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualHubs/virtualHub1/hubRouteTables/hubRouteTable1",
          },
          inboundRouteMap: {
            id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualHubs/virtualHub1/routeMaps/routeMap1",
          },
          outboundRouteMap: {
            id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualHubs/virtualHub1/routeMaps/routeMap2",
          },
          propagatedRouteTables: {
            ids: [
              {
                id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualHubs/virtualHub1/hubRouteTables/hubRouteTable1",
              },
            ],
            labels: ["label1", "label2"],
          },
          vnetRoutes: {
            staticRoutes: [
              {
                name: "route1",
                addressPrefixes: ["10.1.0.0/16", "10.2.0.0/16"],
                nextHopIpAddress: "10.0.0.68",
              },
              {
                name: "route2",
                addressPrefixes: ["10.3.0.0/16", "10.4.0.0/16"],
                nextHopIpAddress: "10.0.0.65",
              },
            ],
            staticRoutesConfig: { vnetLocalRouteOverrideCriteria: "Equal" },
          },
        },
      },
    },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualHubs/{virtualHubName}/hubVirtualNetworkConnections/{connectionName}",
      subscriptionId,
      resourceGroupName,
      virtualHubName,
      connectionName,
    )
    .put(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

hubVirtualNetworkConnectionPut().catch(console.error);
