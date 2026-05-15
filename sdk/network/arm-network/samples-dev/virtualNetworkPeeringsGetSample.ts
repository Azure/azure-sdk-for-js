// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the specified virtual network peering.
 *
 * @summary gets the specified virtual network peering.
 * x-ms-original-file: 2025-05-01/VirtualNetworkPeeringGet.json
 */
async function getPeering(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworkPeerings.get("peerTest", "vnet1", "peer");
  console.log(result);
}

/**
 * This sample demonstrates how to gets the specified virtual network peering.
 *
 * @summary gets the specified virtual network peering.
 * x-ms-original-file: 2025-05-01/VirtualNetworkPeeringGetWithRemoteVirtualNetworkEncryption.json
 */
async function getPeeringWithRemoteVirtualNetworkEncryption(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworkPeerings.get("peerTest", "vnet1", "peer");
  console.log(result);
}

/**
 * This sample demonstrates how to gets the specified virtual network peering.
 *
 * @summary gets the specified virtual network peering.
 * x-ms-original-file: 2025-05-01/VirtualNetworkSubnetPeeringGet.json
 */
async function getSubnetPeering(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworkPeerings.get("peerTest", "vnet1", "peer");
  console.log(result);
}

/**
 * This sample demonstrates how to gets the specified virtual network peering.
 *
 * @summary gets the specified virtual network peering.
 * x-ms-original-file: 2025-05-01/VirtualNetworkV6SubnetPeeringGet.json
 */
async function getV6SubnetPeering(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworkPeerings.get("peerTest", "vnet1", "peer");
  console.log(result);
}

async function main(): Promise<void> {
  await getPeering();
  await getPeeringWithRemoteVirtualNetworkEncryption();
  await getSubnetPeering();
  await getV6SubnetPeering();
}

main().catch(console.error);
