// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or updates a route table in a specified resource group.
 *
 * @summary create or updates a route table in a specified resource group.
 * x-ms-original-file: 2025-07-01/RouteTableCreate.json
 */
async function createRouteTable() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.routeTables.createOrUpdate("rg1", "testrt", { location: "westus" });
  console.log(result);
}

/**
 * This sample demonstrates how to create or updates a route table in a specified resource group.
 *
 * @summary create or updates a route table in a specified resource group.
 * x-ms-original-file: 2025-07-01/RouteTableCreateWithDisablePeeringRoute.json
 */
async function createRouteTableWithDisablePeeringRoute() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.routeTables.createOrUpdate("rg1", "testrt", {
    location: "westus",
    disableBgpRoutePropagation: true,
    disablePeeringRoute: "All",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create or updates a route table in a specified resource group.
 *
 * @summary create or updates a route table in a specified resource group.
 * x-ms-original-file: 2025-07-01/RouteTableCreateWithEcmpRoute.json
 */
async function createRouteTableWithEcmpRoute() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.routeTables.createOrUpdate("rg1", "testrt-ecmp", {
    location: "westus",
    disableBgpRoutePropagation: false,
    routes: [
      {
        addressPrefix: "10.1.0.0/16",
        nextHopType: "VirtualApplianceEcmp",
        nextHop: { nextHopIpAddresses: ["10.0.0.4", "10.0.0.5", "10.0.0.6"] },
      },
    ],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create or updates a route table in a specified resource group.
 *
 * @summary create or updates a route table in a specified resource group.
 * x-ms-original-file: 2025-07-01/RouteTableCreateWithRoute.json
 */
async function createRouteTableWithRoute() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.routeTables.createOrUpdate("rg1", "testrt", {
    location: "westus",
    disableBgpRoutePropagation: true,
    routes: [{ addressPrefix: "10.0.3.0/24", nextHopType: "VirtualNetworkGateway" }],
  });
  console.log(result);
}

async function main() {
  await createRouteTable();
  await createRouteTableWithDisablePeeringRoute();
  await createRouteTableWithEcmpRoute();
  await createRouteTableWithRoute();
}

main().catch(console.error);
