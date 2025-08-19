// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to This operation retrieves a list of routes the virtual network gateway is advertising to the specified peer.
 *
 * @summary This operation retrieves a list of routes the virtual network gateway is advertising to the specified peer.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2024-07-01/examples/VirtualNetworkGatewayGetAdvertisedRoutes.json
 */

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getVirtualNetworkGatewayAdvertisedRoutes(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const virtualNetworkGatewayName = "vpngw";
  const peer = "test";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result =
    await client.virtualNetworkGateways.beginGetAdvertisedRoutesAndWait(
      resourceGroupName,
      virtualNetworkGatewayName,
      peer,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await getVirtualNetworkGatewayAdvertisedRoutes();
}

main().catch(console.error);
