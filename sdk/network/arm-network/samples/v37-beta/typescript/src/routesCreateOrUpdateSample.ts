// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a route in the specified route table.
 *
 * @summary creates or updates a route in the specified route table.
 * x-ms-original-file: 2025-05-01/RouteTableRouteCreate.json
 */
async function createRoute(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.routes.createOrUpdate("rg1", "testrt", "route1", {
    addressPrefix: "10.0.3.0/24",
    nextHopType: "VirtualNetworkGateway",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createRoute();
}

main().catch(console.error);
