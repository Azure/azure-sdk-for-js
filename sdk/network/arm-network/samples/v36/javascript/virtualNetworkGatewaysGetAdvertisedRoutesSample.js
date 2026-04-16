// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to This operation retrieves a list of routes the virtual network gateway is advertising to the specified peer.
 *
 * @summary This operation retrieves a list of routes the virtual network gateway is advertising to the specified peer.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/VirtualNetworkGatewayGetAdvertisedRoutes.json
 */
async function getVirtualNetworkGatewayAdvertisedRoutes() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const virtualNetworkGatewayName = "vpngw";
  const peer = "test";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworkGateways.beginGetAdvertisedRoutesAndWait(
    resourceGroupName,
    virtualNetworkGatewayName,
    peer,
  );
  console.log(result);
}

async function main() {
  await getVirtualNetworkGatewayAdvertisedRoutes();
}

main().catch(console.error);
