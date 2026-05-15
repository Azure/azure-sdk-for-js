// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gives the list of VpnServerConfigurations associated with Virtual Wan in a resource group.
 *
 * @summary gives the list of VpnServerConfigurations associated with Virtual Wan in a resource group.
 * x-ms-original-file: 2025-05-01/GetVirtualWanVpnServerConfigurations.json
 */
async function getVirtualWanVpnServerConfigurations() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.vpnServerConfigurationsAssociatedWithVirtualWan.list("rg1", "wan1");
  console.log(result);
}

async function main() {
  await getVirtualWanVpnServerConfigurations();
}

main().catch(console.error);
