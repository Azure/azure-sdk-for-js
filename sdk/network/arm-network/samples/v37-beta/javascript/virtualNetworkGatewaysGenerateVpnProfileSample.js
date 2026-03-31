// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to generates VPN profile for P2S client of the virtual network gateway in the specified resource group. Used for IKEV2 and radius based authentication.
 *
 * @summary generates VPN profile for P2S client of the virtual network gateway in the specified resource group. Used for IKEV2 and radius based authentication.
 * x-ms-original-file: 2025-05-01/VirtualNetworkGatewayGenerateVpnProfile.json
 */
async function generateVirtualNetworkGatewayVPNProfile() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworkGateways.generateVpnProfile("rg1", "vpngw", {});
  console.log(result);
}

async function main() {
  await generateVirtualNetworkGatewayVPNProfile();
}

main().catch(console.error);
