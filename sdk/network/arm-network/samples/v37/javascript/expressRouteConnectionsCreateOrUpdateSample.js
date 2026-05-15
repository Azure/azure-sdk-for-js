// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates a connection between an ExpressRoute gateway and an ExpressRoute circuit.
 *
 * @summary creates a connection between an ExpressRoute gateway and an ExpressRoute circuit.
 * x-ms-original-file: 2025-05-01/ExpressRouteConnectionCreate.json
 */
async function expressRouteConnectionCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.expressRouteConnections.createOrUpdate(
    "resourceGroupName",
    "gateway-2",
    "connectionName",
    {
      name: "connectionName",
      id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/resourceGroupName/providers/Microsoft.Network/expressRouteGateways/gateway-2/expressRouteConnections/connectionName",
      authorizationKey: "authorizationKey",
      expressRouteCircuitPeering: {
        id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/resourceGroupName/providers/Microsoft.Network/expressRouteCircuits/circuitName/peerings/AzurePrivatePeering",
      },
      routingConfiguration: {
        associatedRouteTable: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/resourceGroupName/providers/Microsoft.Network/virtualHubs/hub1/hubRouteTables/hubRouteTable1",
        },
        inboundRouteMap: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualHubs/virtualHub1/routeMaps/routeMap1",
        },
        outboundRouteMap: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualHubs/virtualHub1/routeMaps/routeMap2",
        },
        propagatedRouteTables: {
          ids: [
            {
              id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/resourceGroupName/providers/Microsoft.Network/virtualHubs/hub1/hubRouteTables/hubRouteTable1",
            },
            {
              id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/resourceGroupName/providers/Microsoft.Network/virtualHubs/hub1/hubRouteTables/hubRouteTable2",
            },
            {
              id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/resourceGroupName/providers/Microsoft.Network/virtualHubs/hub1/hubRouteTables/hubRouteTable3",
            },
          ],
          labels: ["label1", "label2"],
        },
      },
      routingWeight: 2,
    },
  );
  console.log(result);
}

async function main() {
  await expressRouteConnectionCreate();
}

main().catch(console.error);
