// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates a RouteTable resource if it doesn't exist else updates the existing RouteTable.
 *
 * @summary Creates a RouteTable resource if it doesn't exist else updates the existing RouteTable.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/HubRouteTablePut.json
 */

import type { HubRouteTablesCreateOrUpdateParameters } from "@azure-rest/arm-network";
import createNetworkManagementClient, { getLongRunningPoller } from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function routeTablePut(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const virtualHubName = "virtualHub1";
  const routeTableName = "hubRouteTable1";
  const options: HubRouteTablesCreateOrUpdateParameters = {
    body: {
      properties: {
        labels: ["label1", "label2"],
        routes: [
          {
            name: "route1",
            destinationType: "CIDR",
            destinations: ["10.0.0.0/8", "20.0.0.0/8", "30.0.0.0/8"],
            nextHop:
              "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/azureFirewalls/azureFirewall1",
            nextHopType: "ResourceId",
          },
        ],
      },
    },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualHubs/{virtualHubName}/hubRouteTables/{routeTableName}",
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

routeTablePut().catch(console.error);
