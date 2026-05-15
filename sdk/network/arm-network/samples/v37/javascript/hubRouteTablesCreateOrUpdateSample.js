// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates a RouteTable resource if it doesn't exist else updates the existing RouteTable.
 *
 * @summary creates a RouteTable resource if it doesn't exist else updates the existing RouteTable.
 * x-ms-original-file: 2025-05-01/HubRouteTablePut.json
 */
async function routeTablePut() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.hubRouteTables.createOrUpdate(
    "rg1",
    "virtualHub1",
    "hubRouteTable1",
    {
      labels: ["label1", "label2"],
      routes: [
        {
          name: "route1",
          destinationType: "CIDR",
          destinations: ["10.0.0.0/8", "20.0.0.0/8", "30.0.0.0/8"],
          nextHop:
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/azureFirewalls/azureFirewall1",
          nextHopType: "ResourceId",
        },
      ],
    },
  );
  console.log(result);
}

async function main() {
  await routeTablePut();
}

main().catch(console.error);
