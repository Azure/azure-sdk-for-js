// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists ExpressRoute gateways in a given resource group.
 *
 * @summary lists ExpressRoute gateways in a given resource group.
 * x-ms-original-file: 2025-05-01/ExpressRouteGatewayListByResourceGroup.json
 */
async function expressRouteGatewayListByResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.expressRouteGateways.listByResourceGroup("resourceGroupName");
  console.log(result);
}

async function main() {
  await expressRouteGatewayListByResourceGroup();
}

main().catch(console.error);
