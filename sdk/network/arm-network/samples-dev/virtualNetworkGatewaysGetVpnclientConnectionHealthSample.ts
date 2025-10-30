// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Get VPN client connection health detail per P2S client connection of the virtual network gateway in the specified resource group.
 *
 * @summary Get VPN client connection health detail per P2S client connection of the virtual network gateway in the specified resource group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2024-10-01/examples/VirtualNetworkGatewayGetVpnclientConnectionHealth.json
 */
async function getVirtualNetworkGatewayVpnclientConnectionHealth(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName =
    process.env["NETWORK_RESOURCE_GROUP"] || "p2s-vnet-test";
  const virtualNetworkGatewayName = "vpnp2sgw";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result =
    await client.virtualNetworkGateways.beginGetVpnclientConnectionHealthAndWait(
      resourceGroupName,
      virtualNetworkGatewayName,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await getVirtualNetworkGatewayVpnclientConnectionHealth();
}

main().catch(console.error);
