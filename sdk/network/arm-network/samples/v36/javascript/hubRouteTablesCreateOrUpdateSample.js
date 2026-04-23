// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Creates a RouteTable resource if it doesn't exist else updates the existing RouteTable.
 *
 * @summary Creates a RouteTable resource if it doesn't exist else updates the existing RouteTable.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/HubRouteTablePut.json
 */
async function routeTablePut() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const virtualHubName = "virtualHub1";
  const routeTableName = "hubRouteTable1";
  const routeTableParameters = {
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
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.hubRouteTables.beginCreateOrUpdateAndWait(
    resourceGroupName,
    virtualHubName,
    routeTableName,
    routeTableParameters,
  );
  console.log(result);
}

async function main() {
  await routeTablePut();
}

main().catch(console.error);
