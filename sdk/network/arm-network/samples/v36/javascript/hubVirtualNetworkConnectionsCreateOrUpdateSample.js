// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Creates a hub virtual network connection if it doesn't exist else updates the existing one.
 *
 * @summary Creates a hub virtual network connection if it doesn't exist else updates the existing one.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/HubVirtualNetworkConnectionPut.json
 */
async function hubVirtualNetworkConnectionPut() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const virtualHubName = "virtualHub1";
  const connectionName = "connection1";
  const hubVirtualNetworkConnectionParameters = {
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
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.hubVirtualNetworkConnections.beginCreateOrUpdateAndWait(
    resourceGroupName,
    virtualHubName,
    connectionName,
    hubVirtualNetworkConnectionParameters,
  );
  console.log(result);
}

async function main() {
  await hubVirtualNetworkConnectionPut();
}

main().catch(console.error);
