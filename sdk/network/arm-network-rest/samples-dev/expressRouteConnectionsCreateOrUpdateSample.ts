// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createNetworkManagementClient, {
  ExpressRouteConnectionsCreateOrUpdateParameters,
  getLongRunningPoller,
} from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Creates a connection between an ExpressRoute gateway and an ExpressRoute circuit.
 *
 * @summary Creates a connection between an ExpressRoute gateway and an ExpressRoute circuit.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/ExpressRouteConnectionCreate.json
 */
async function expressRouteConnectionCreate() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "resourceGroupName";
  const expressRouteGatewayName = "gateway-2";
  const connectionName = "connectionName";
  const options: ExpressRouteConnectionsCreateOrUpdateParameters = {
    body: {
      name: "connectionName",
      id:
        "/subscriptions/subid/resourceGroups/resourceGroupName/providers/Microsoft.Network/expressRouteGateways/gateway-2/expressRouteConnections/connectionName",
      properties: {
        authorizationKey: "authorizationKey",
        expressRouteCircuitPeering: {
          id:
            "/subscriptions/subid/resourceGroups/resourceGroupName/providers/Microsoft.Network/expressRouteCircuits/circuitName/peerings/AzurePrivatePeering",
        },
        routingConfiguration: {
          associatedRouteTable: {
            id:
              "/subscriptions/subid/resourceGroups/resourceGroupName/providers/Microsoft.Network/virtualHubs/hub1/hubRouteTables/hubRouteTable1",
          },
          inboundRouteMap: {
            id:
              "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualHubs/virtualHub1/routeMaps/routeMap1",
          },
          outboundRouteMap: {
            id:
              "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualHubs/virtualHub1/routeMaps/routeMap2",
          },
          propagatedRouteTables: {
            ids: [
              {
                id:
                  "/subscriptions/subid/resourceGroups/resourceGroupName/providers/Microsoft.Network/virtualHubs/hub1/hubRouteTables/hubRouteTable1",
              },
              {
                id:
                  "/subscriptions/subid/resourceGroups/resourceGroupName/providers/Microsoft.Network/virtualHubs/hub1/hubRouteTables/hubRouteTable2",
              },
              {
                id:
                  "/subscriptions/subid/resourceGroups/resourceGroupName/providers/Microsoft.Network/virtualHubs/hub1/hubRouteTables/hubRouteTable3",
              },
            ],
            labels: ["label1", "label2"],
          },
        },
        routingWeight: 2,
      },
    },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteGateways/{expressRouteGatewayName}/expressRouteConnections/{connectionName}",
      subscriptionId,
      resourceGroupName,
      expressRouteGatewayName,
      connectionName
    )
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

expressRouteConnectionCreate().catch(console.error);
