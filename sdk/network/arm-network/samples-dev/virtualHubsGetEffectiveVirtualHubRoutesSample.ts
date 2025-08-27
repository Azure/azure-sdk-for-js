// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the effective routes configured for the Virtual Hub resource or the specified resource .
 *
 * @summary Gets the effective routes configured for the Virtual Hub resource or the specified resource .
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2024-07-01/examples/EffectiveRoutesListForConnection.json
 */

import type {
  EffectiveRoutesParameters,
  VirtualHubsGetEffectiveVirtualHubRoutesOptionalParams} from "@azure/arm-network";
import {
  NetworkManagementClient,
} from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function effectiveRoutesForAConnectionResource(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const virtualHubName = "virtualHub1";
  const effectiveRoutesParameters: EffectiveRoutesParameters = {
    resourceId:
      "/subscriptions/subid/resourceGroups/resourceGroupName/providers/Microsoft.Network/expressRouteGateways/expressRouteGatewayName/expressRouteConnections/connectionName",
    virtualWanResourceType: "ExpressRouteConnection",
  };
  const options: VirtualHubsGetEffectiveVirtualHubRoutesOptionalParams = {
    effectiveRoutesParameters,
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result =
    await client.virtualHubs.beginGetEffectiveVirtualHubRoutesAndWait(
      resourceGroupName,
      virtualHubName,
      options,
    );
  console.log(result);
}

/**
 * This sample demonstrates how to Gets the effective routes configured for the Virtual Hub resource or the specified resource .
 *
 * @summary Gets the effective routes configured for the Virtual Hub resource or the specified resource .
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2024-07-01/examples/EffectiveRoutesListForRouteTable.json
 */
async function effectiveRoutesForARouteTableResource(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const virtualHubName = "virtualHub1";
  const effectiveRoutesParameters: EffectiveRoutesParameters = {
    resourceId:
      "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualHubs/virtualHub1/hubRouteTables/hubRouteTable1",
    virtualWanResourceType: "RouteTable",
  };
  const options: VirtualHubsGetEffectiveVirtualHubRoutesOptionalParams = {
    effectiveRoutesParameters,
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result =
    await client.virtualHubs.beginGetEffectiveVirtualHubRoutesAndWait(
      resourceGroupName,
      virtualHubName,
      options,
    );
  console.log(result);
}

/**
 * This sample demonstrates how to Gets the effective routes configured for the Virtual Hub resource or the specified resource .
 *
 * @summary Gets the effective routes configured for the Virtual Hub resource or the specified resource .
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2024-07-01/examples/EffectiveRoutesListForVirtualHub.json
 */
async function effectiveRoutesForTheVirtualHub(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const virtualHubName = "virtualHub1";
  const effectiveRoutesParameters: EffectiveRoutesParameters = {};
  const options: VirtualHubsGetEffectiveVirtualHubRoutesOptionalParams = {
    effectiveRoutesParameters,
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result =
    await client.virtualHubs.beginGetEffectiveVirtualHubRoutesAndWait(
      resourceGroupName,
      virtualHubName,
      options,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await effectiveRoutesForAConnectionResource();
  await effectiveRoutesForARouteTableResource();
  await effectiveRoutesForTheVirtualHub();
}

main().catch(console.error);
