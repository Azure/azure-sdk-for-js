// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the specified virtual network peering.
 *
 * @summary Gets the specified virtual network peering.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2024-07-01/examples/VirtualNetworkV6SubnetPeeringGet.json
 */

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getV6SubnetPeering(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "peerTest";
  const virtualNetworkName = "vnet1";
  const virtualNetworkPeeringName = "peer";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworkPeerings.get(
    resourceGroupName,
    virtualNetworkName,
    virtualNetworkPeeringName,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Gets the specified virtual network peering.
 *
 * @summary Gets the specified virtual network peering.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2024-07-01/examples/VirtualNetworkPeeringGet.json
 */
async function getPeering(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "peerTest";
  const virtualNetworkName = "vnet1";
  const virtualNetworkPeeringName = "peer";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworkPeerings.get(
    resourceGroupName,
    virtualNetworkName,
    virtualNetworkPeeringName,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Gets the specified virtual network peering.
 *
 * @summary Gets the specified virtual network peering.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2024-07-01/examples/VirtualNetworkPeeringGetWithRemoteVirtualNetworkEncryption.json
 */
async function getPeeringWithRemoteVirtualNetworkEncryption(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "peerTest";
  const virtualNetworkName = "vnet1";
  const virtualNetworkPeeringName = "peer";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworkPeerings.get(
    resourceGroupName,
    virtualNetworkName,
    virtualNetworkPeeringName,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Gets the specified virtual network peering.
 *
 * @summary Gets the specified virtual network peering.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2024-07-01/examples/VirtualNetworkSubnetPeeringGet.json
 */
async function getSubnetPeering(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "peerTest";
  const virtualNetworkName = "vnet1";
  const virtualNetworkPeeringName = "peer";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworkPeerings.get(
    resourceGroupName,
    virtualNetworkName,
    virtualNetworkPeeringName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getV6SubnetPeering();
  await getPeering();
  await getPeeringWithRemoteVirtualNetworkEncryption();
  await getSubnetPeering();
}

main().catch(console.error);
