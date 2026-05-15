// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a peering in the specified virtual network.
 *
 * @summary creates or updates a peering in the specified virtual network.
 * x-ms-original-file: 2025-05-01/VirtualNetworkPeeringCreate.json
 */
async function createPeering() {
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
async function createPeeringWithRemoteVirtualNetworkEncryption() {
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
async function syncPeering() {
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
async function createSubnetPeering() {
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
async function syncSubnetPeering() {
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
async function createV6SubnetPeering() {
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
async function syncV6SubnetPeering() {
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

async function main() {
  await createPeering();
  await createPeeringWithRemoteVirtualNetworkEncryption();
  await syncPeering();
  await createSubnetPeering();
  await syncSubnetPeering();
  await createV6SubnetPeering();
  await syncV6SubnetPeering();
}

main().catch(console.error);
