// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates a hub virtual network connection if it doesn't exist else updates the existing one.
 *
 * @summary creates a hub virtual network connection if it doesn't exist else updates the existing one.
 * x-ms-original-file: 2025-05-01/HubVirtualNetworkConnectionPut.json
 */
async function hubVirtualNetworkConnectionPut() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.hubVirtualNetworkConnections.createOrUpdate(
    "rg1",
    "virtualHub1",
    "connection1",
    {
      enableInternetSecurity: false,
      remoteVirtualNetwork: {
        id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/SpokeVnet1",
      },
      routingConfiguration: {
        associatedRouteTable: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualHubs/virtualHub1/hubRouteTables/hubRouteTable1",
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
              id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualHubs/virtualHub1/hubRouteTables/hubRouteTable1",
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
  );
  console.log(result);
}

async function main() {
  await hubVirtualNetworkConnectionPut();
}

main().catch(console.error);
