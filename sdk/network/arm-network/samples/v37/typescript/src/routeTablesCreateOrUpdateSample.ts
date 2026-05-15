// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or updates a route table in a specified resource group.
 *
 * @summary create or updates a route table in a specified resource group.
 * x-ms-original-file: 2025-05-01/RouteTableCreate.json
 */
async function createRouteTable(): Promise<void> {
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
 * x-ms-original-file: 2025-05-01/RouteTableCreateWithRoute.json
 */
async function createRouteTableWithRoute(): Promise<void> {
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

async function main(): Promise<void> {
  await createRouteTable();
  await createRouteTableWithRoute();
}

main().catch(console.error);
