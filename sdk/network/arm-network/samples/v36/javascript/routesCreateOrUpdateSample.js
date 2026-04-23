// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Creates or updates a route in the specified route table.
 *
 * @summary Creates or updates a route in the specified route table.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/RouteTableRouteCreate.json
 */
async function createRoute() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const routeTableName = "testrt";
  const routeName = "route1";
  const routeParameters = {
    addressPrefix: "10.0.3.0/24",
    nextHopType: "VirtualNetworkGateway",
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.routes.beginCreateOrUpdateAndWait(
    resourceGroupName,
    routeTableName,
    routeName,
    routeParameters,
  );
  console.log(result);
}

async function main() {
  await createRoute();
}

main().catch(console.error);
