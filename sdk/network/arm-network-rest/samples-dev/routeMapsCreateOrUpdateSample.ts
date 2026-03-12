// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates a RouteMap if it doesn't exist else updates the existing one.
 *
 * @summary Creates a RouteMap if it doesn't exist else updates the existing one.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/RouteMapPut.json
 */

import type { RouteMapsCreateOrUpdateParameters } from "@azure-rest/arm-network";
import createNetworkManagementClient, { getLongRunningPoller } from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function routeMapPut(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const virtualHubName = "virtualHub1";
  const routeMapName = "routeMap1";
  const options: RouteMapsCreateOrUpdateParameters = {
    body: {
      properties: {
        associatedInboundConnections: [
          "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/expressRouteGateways/exrGateway1/expressRouteConnections/exrConn1",
        ],
        associatedOutboundConnections: [],
        rules: [
          {
            name: "rule1",
            actions: [
              {
                type: "Add",
                parameters: [{ asPath: ["22334"], community: [], routePrefix: [] }],
              },
            ],
            matchCriteria: [
              {
                asPath: [],
                community: [],
                matchCondition: "Contains",
                routePrefix: ["10.0.0.0/8"],
              },
            ],
            nextStepIfMatched: "Continue",
          },
        ],
      },
    },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualHubs/{virtualHubName}/routeMaps/{routeMapName}",
      subscriptionId,
      resourceGroupName,
      virtualHubName,
      routeMapName,
    )
    .put(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

routeMapPut().catch(console.error);
