// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a peering in the specified virtual network.
 *
 * @summary creates or updates a peering in the specified virtual network.
 * x-ms-original-file: 2025-05-01/VirtualNetworkPeeringCreate.json
 */
async function createPeering(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworkPeerings.createOrUpdate("peerTest", "vnet1", "peer", {
    allowForwardedTraffic: true,
    allowGatewayTransit: false,
    allowVirtualNetworkAccess: true,
    remoteVirtualNetwork: {
      id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/peerTest/providers/Microsoft.Network/virtualNetworks/vnet2",
    },
    useRemoteGateways: false,
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a peering in the specified virtual network.
 *
 * @summary creates or updates a peering in the specified virtual network.
 * x-ms-original-file: 2025-05-01/VirtualNetworkPeeringCreateWithRemoteVirtualNetworkEncryption.json
 */
async function createPeeringWithRemoteVirtualNetworkEncryption(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworkPeerings.createOrUpdate("peerTest", "vnet1", "peer", {
    allowForwardedTraffic: true,
    allowGatewayTransit: false,
    allowVirtualNetworkAccess: true,
    remoteVirtualNetwork: {
      id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/peerTest/providers/Microsoft.Network/virtualNetworks/vnet2",
    },
    useRemoteGateways: false,
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a peering in the specified virtual network.
 *
 * @summary creates or updates a peering in the specified virtual network.
 * x-ms-original-file: 2025-05-01/VirtualNetworkPeeringSync.json
 */
async function syncPeering(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworkPeerings.createOrUpdate(
    "peerTest",
    "vnet1",
    "peer",
    {
      allowForwardedTraffic: true,
      allowGatewayTransit: false,
      allowVirtualNetworkAccess: true,
      remoteVirtualNetwork: {
        id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/peerTest/providers/Microsoft.Network/virtualNetworks/vnet2",
      },
      useRemoteGateways: false,
    },
    { syncRemoteAddressSpace: "true" },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a peering in the specified virtual network.
 *
 * @summary creates or updates a peering in the specified virtual network.
 * x-ms-original-file: 2025-05-01/VirtualNetworkSubnetPeeringCreate.json
 */
async function createSubnetPeering(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworkPeerings.createOrUpdate("peerTest", "vnet1", "peer", {
    allowForwardedTraffic: true,
    allowGatewayTransit: false,
    allowVirtualNetworkAccess: true,
    enableOnlyIPv6Peering: false,
    localSubnetNames: ["Subnet1", "Subnet4"],
    peerCompleteVnets: false,
    remoteSubnetNames: ["Subnet2"],
    remoteVirtualNetwork: {
      id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/peerTest/providers/Microsoft.Network/virtualNetworks/vnet2",
    },
    useRemoteGateways: false,
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a peering in the specified virtual network.
 *
 * @summary creates or updates a peering in the specified virtual network.
 * x-ms-original-file: 2025-05-01/VirtualNetworkSubnetPeeringSync.json
 */
async function syncSubnetPeering(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworkPeerings.createOrUpdate(
    "peerTest",
    "vnet1",
    "peer",
    {
      allowForwardedTraffic: true,
      allowGatewayTransit: false,
      allowVirtualNetworkAccess: true,
      enableOnlyIPv6Peering: false,
      peerCompleteVnets: false,
      remoteVirtualNetwork: {
        id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/peerTest/providers/Microsoft.Network/virtualNetworks/vnet2",
      },
      useRemoteGateways: false,
    },
    { syncRemoteAddressSpace: "true" },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a peering in the specified virtual network.
 *
 * @summary creates or updates a peering in the specified virtual network.
 * x-ms-original-file: 2025-05-01/VirtualNetworkV6SubnetPeeringCreate.json
 */
async function createV6SubnetPeering(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworkPeerings.createOrUpdate("peerTest", "vnet1", "peer", {
    allowForwardedTraffic: true,
    allowGatewayTransit: false,
    allowVirtualNetworkAccess: true,
    enableOnlyIPv6Peering: true,
    localSubnetNames: ["Subnet1", "Subnet4"],
    peerCompleteVnets: false,
    remoteSubnetNames: ["Subnet2"],
    remoteVirtualNetwork: {
      id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/peerTest/providers/Microsoft.Network/virtualNetworks/vnet2",
    },
    useRemoteGateways: false,
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a peering in the specified virtual network.
 *
 * @summary creates or updates a peering in the specified virtual network.
 * x-ms-original-file: 2025-05-01/VirtualNetworkV6SubnetPeeringSync.json
 */
async function syncV6SubnetPeering(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworkPeerings.createOrUpdate(
    "peerTest",
    "vnet1",
    "peer",
    {
      allowForwardedTraffic: true,
      allowGatewayTransit: false,
      allowVirtualNetworkAccess: true,
      enableOnlyIPv6Peering: true,
      peerCompleteVnets: false,
      remoteVirtualNetwork: {
        id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/peerTest/providers/Microsoft.Network/virtualNetworks/vnet2",
      },
      useRemoteGateways: false,
    },
    { syncRemoteAddressSpace: "true" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createPeering();
  await createPeeringWithRemoteVirtualNetworkEncryption();
  await syncPeering();
  await createSubnetPeering();
  await syncSubnetPeering();
  await createV6SubnetPeering();
  await syncV6SubnetPeering();
}

main().catch(console.error);
