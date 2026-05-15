// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the Ddos Protection Status of all IP Addresses under the Virtual Network
 *
 * @summary gets the Ddos Protection Status of all IP Addresses under the Virtual Network
 * x-ms-original-file: 2025-05-01/VirtualNetworkGetDdosProtectionStatus.json
 */
async function getDdosProtectionStatusOfAVirtualNetwork() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworks.listDdosProtectionStatus("rg1", "test-vnet", {
    top: 75,
  });
  console.log(result);
}

async function main() {
  await getDdosProtectionStatusOfAVirtualNetwork();
}

main().catch(console.error);
