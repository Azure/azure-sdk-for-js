// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the effective routes configured for the Virtual Hub resource or the specified resource .
 *
 * @summary gets the effective routes configured for the Virtual Hub resource or the specified resource .
 * x-ms-original-file: 2025-05-01/EffectiveRoutesListForConnection.json
 */
async function effectiveRoutesForAConnectionResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualHubs.getEffectiveVirtualHubRoutes("rg1", "virtualHub1", {
    effectiveRoutesParameters: {
      resourceId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/resourceGroupName/providers/Microsoft.Network/expressRouteGateways/expressRouteGatewayName/expressRouteConnections/connectionName",
      virtualWanResourceType: "ExpressRouteConnection",
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to gets the effective routes configured for the Virtual Hub resource or the specified resource .
 *
 * @summary gets the effective routes configured for the Virtual Hub resource or the specified resource .
 * x-ms-original-file: 2025-05-01/EffectiveRoutesListForRouteTable.json
 */
async function effectiveRoutesForARouteTableResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualHubs.getEffectiveVirtualHubRoutes("rg1", "virtualHub1", {
    effectiveRoutesParameters: {
      resourceId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualHubs/virtualHub1/hubRouteTables/hubRouteTable1",
      virtualWanResourceType: "RouteTable",
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to gets the effective routes configured for the Virtual Hub resource or the specified resource .
 *
 * @summary gets the effective routes configured for the Virtual Hub resource or the specified resource .
 * x-ms-original-file: 2025-05-01/EffectiveRoutesListForVirtualHub.json
 */
async function effectiveRoutesForTheVirtualHub(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualHubs.getEffectiveVirtualHubRoutes("rg1", "virtualHub1");
  console.log(result);
}

async function main(): Promise<void> {
  await effectiveRoutesForAConnectionResource();
  await effectiveRoutesForARouteTableResource();
  await effectiveRoutesForTheVirtualHub();
}

main().catch(console.error);
