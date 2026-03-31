// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get VPN client connection health detail per P2S client connection of the virtual network gateway in the specified resource group.
 *
 * @summary get VPN client connection health detail per P2S client connection of the virtual network gateway in the specified resource group.
 * x-ms-original-file: 2025-05-01/VirtualNetworkGatewayGetVpnclientConnectionHealth.json
 */
async function getVirtualNetworkGatewayVpnclientConnectionHealth() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworkGateways.getVpnclientConnectionHealth(
    "p2s-vnet-test",
    "vpnp2sgw",
  );
  console.log(result);
}

async function main() {
  await getVirtualNetworkGatewayVpnclientConnectionHealth();
}

main().catch(console.error);
