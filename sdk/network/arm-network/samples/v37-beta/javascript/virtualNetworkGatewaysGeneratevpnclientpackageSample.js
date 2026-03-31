// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to generates VPN client package for P2S client of the virtual network gateway in the specified resource group.
 *
 * @summary generates VPN client package for P2S client of the virtual network gateway in the specified resource group.
 * x-ms-original-file: 2025-05-01/VirtualNetworkGatewayGenerateVpnClientPackage.json
 */
async function generateVPNClientPackage() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworkGateways.generatevpnclientpackage("rg1", "vpngw", {});
  console.log(result);
}

async function main() {
  await generateVPNClientPackage();
}

main().catch(console.error);
