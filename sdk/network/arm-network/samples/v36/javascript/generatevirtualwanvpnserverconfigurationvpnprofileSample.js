// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Generates a unique VPN profile for P2S clients for VirtualWan and associated VpnServerConfiguration combination in the specified resource group.
 *
 * @summary Generates a unique VPN profile for P2S clients for VirtualWan and associated VpnServerConfiguration combination in the specified resource group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/GenerateVirtualWanVpnServerConfigurationVpnProfile.json
 */
async function generateVirtualWanVpnServerConfigurationVpnProfile() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const virtualWANName = "wan1";
  const vpnClientParams = {
    authenticationMethod: "EAPTLS",
    vpnServerConfigurationResourceId:
      "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/vpnServerConfigurations/vpnconfig1",
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.beginGeneratevirtualwanvpnserverconfigurationvpnprofileAndWait(
    resourceGroupName,
    virtualWANName,
    vpnClientParams,
  );
  console.log(result);
}

async function main() {
  await generateVirtualWanVpnServerConfigurationVpnProfile();
}

main().catch(console.error);
