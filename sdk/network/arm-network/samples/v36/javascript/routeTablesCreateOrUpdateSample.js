// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Create or updates a route table in a specified resource group.
 *
 * @summary Create or updates a route table in a specified resource group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/RouteTableCreate.json
 */
async function createRouteTable() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const routeTableName = "testrt";
  const parameters = { location: "westus" };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.routeTables.beginCreateOrUpdateAndWait(
    resourceGroupName,
    routeTableName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Create or updates a route table in a specified resource group.
 *
 * @summary Create or updates a route table in a specified resource group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/RouteTableCreateWithRoute.json
 */
async function createRouteTableWithRoute() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const routeTableName = "testrt";
  const parameters = {
    disableBgpRoutePropagation: true,
    location: "westus",
    routes: [
      {
        name: "route1",
        addressPrefix: "10.0.3.0/24",
        nextHopType: "VirtualNetworkGateway",
      },
    ],
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.routeTables.beginCreateOrUpdateAndWait(
    resourceGroupName,
    routeTableName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await createRouteTable();
  await createRouteTableWithRoute();
}

main().catch(console.error);
