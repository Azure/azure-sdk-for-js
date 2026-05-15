// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the specified virtual network by resource group.
 *
 * @summary gets the specified virtual network by resource group.
 * x-ms-original-file: 2025-05-01/VirtualNetworkGet.json
 */
async function getVirtualNetwork() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworks.get("rg1", "test-vnet");
  console.log(result);
}

/**
 * This sample demonstrates how to gets the specified virtual network by resource group.
 *
 * @summary gets the specified virtual network by resource group.
 * x-ms-original-file: 2025-05-01/VirtualNetworkGetWithServiceAssociationLink.json
 */
async function getVirtualNetworkWithServiceAssociationLinks() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworks.get("rg1", "test-vnet");
  console.log(result);
}

/**
 * This sample demonstrates how to gets the specified virtual network by resource group.
 *
 * @summary gets the specified virtual network by resource group.
 * x-ms-original-file: 2025-05-01/VirtualNetworkGetWithSubnetDelegation.json
 */
async function getVirtualNetworkWithADelegatedSubnet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworks.get("rg1", "test-vnet");
  console.log(result);
}

async function main() {
  await getVirtualNetwork();
  await getVirtualNetworkWithServiceAssociationLinks();
  await getVirtualNetworkWithADelegatedSubnet();
}

main().catch(console.error);
