// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get VPN client connection health detail per P2S client connection of the virtual network gateway in the specified resource group.
 *
 * @summary get VPN client connection health detail per P2S client connection of the virtual network gateway in the specified resource group.
 * x-ms-original-file: 2025-05-01/VirtualNetworkGatewayGetVpnclientConnectionHealth.json
 */
async function getVirtualNetworkGatewayVpnclientConnectionHealth(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworkGateways.getVpnclientConnectionHealth(
    "p2s-vnet-test",
    "vpnp2sgw",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getVirtualNetworkGatewayVpnclientConnectionHealth();
}

main().catch(console.error);
