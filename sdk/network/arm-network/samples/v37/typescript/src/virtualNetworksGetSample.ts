// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the specified virtual network by resource group.
 *
 * @summary gets the specified virtual network by resource group.
 * x-ms-original-file: 2025-05-01/VirtualNetworkGet.json
 */
async function getVirtualNetwork(): Promise<void> {
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
async function getVirtualNetworkWithServiceAssociationLinks(): Promise<void> {
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
async function getVirtualNetworkWithADelegatedSubnet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworks.get("rg1", "test-vnet");
  console.log(result);
}

async function main(): Promise<void> {
  await getVirtualNetwork();
  await getVirtualNetworkWithServiceAssociationLinks();
  await getVirtualNetworkWithADelegatedSubnet();
}

main().catch(console.error);
