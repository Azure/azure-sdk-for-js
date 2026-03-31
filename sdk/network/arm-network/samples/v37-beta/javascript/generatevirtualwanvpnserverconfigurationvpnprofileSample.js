// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to generates a unique VPN profile for P2S clients for VirtualWan and associated VpnServerConfiguration combination in the specified resource group.
 *
 * @summary generates a unique VPN profile for P2S clients for VirtualWan and associated VpnServerConfiguration combination in the specified resource group.
 * x-ms-original-file: 2025-05-01/GenerateVirtualWanVpnServerConfigurationVpnProfile.json
 */
async function generateVirtualWanVpnServerConfigurationVpnProfile() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.generatevirtualwanvpnserverconfigurationvpnprofile("rg1", "wan1", {
    authenticationMethod: "EAPTLS",
    vpnServerConfigurationResourceId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/vpnServerConfigurations/vpnconfig1",
  });
  console.log(result);
}

async function main() {
  await generateVirtualWanVpnServerConfigurationVpnProfile();
}

main().catch(console.error);
