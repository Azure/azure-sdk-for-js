// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to this operation retrieves a list of routes the virtual network gateway is advertising to the specified peer.
 *
 * @summary this operation retrieves a list of routes the virtual network gateway is advertising to the specified peer.
 * x-ms-original-file: 2025-05-01/VirtualNetworkGatewayGetAdvertisedRoutes.json
 */
async function getVirtualNetworkGatewayAdvertisedRoutes() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworkGateways.getAdvertisedRoutes("rg1", "vpngw", "test");
  console.log(result);
}

async function main() {
  await getVirtualNetworkGatewayAdvertisedRoutes();
}

main().catch(console.error);
