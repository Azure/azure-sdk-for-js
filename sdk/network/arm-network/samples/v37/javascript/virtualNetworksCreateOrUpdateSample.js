// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a virtual network in the specified resource group.
 *
 * @summary creates or updates a virtual network in the specified resource group.
 * x-ms-original-file: 2025-05-01/VirtualNetworkCreate.json
 */
async function createVirtualNetwork() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworks.createOrUpdate("rg1", "test-vnet", {
    location: "eastus",
    addressSpace: { addressPrefixes: ["10.0.0.0/16"] },
    flowTimeoutInMinutes: 10,
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a virtual network in the specified resource group.
 *
 * @summary creates or updates a virtual network in the specified resource group.
 * x-ms-original-file: 2025-05-01/VirtualNetworkCreateServiceEndpointPolicy.json
 */
async function createVirtualNetworkWithServiceEndpointsAndServiceEndpointPolicy() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworks.createOrUpdate("vnetTest", "vnet1", {
    location: "eastus2euap",
    addressSpace: { addressPrefixes: ["10.0.0.0/16"] },
    subnets: [
      {
        addressPrefix: "10.0.0.0/16",
        serviceEndpointPolicies: [
          {
            id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/vnetTest/providers/Microsoft.Network/serviceEndpointPolicies/ServiceEndpointPolicy1",
          },
        ],
        serviceEndpoints: [{ service: "Microsoft.Storage" }],
      },
    ],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a virtual network in the specified resource group.
 *
 * @summary creates or updates a virtual network in the specified resource group.
 * x-ms-original-file: 2025-05-01/VirtualNetworkCreateServiceEndpoints.json
 */
async function createVirtualNetworkWithServiceEndpoints() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworks.createOrUpdate("vnetTest", "vnet1", {
    location: "eastus",
    addressSpace: { addressPrefixes: ["10.0.0.0/16"] },
    subnets: [
      { addressPrefix: "10.0.0.0/16", serviceEndpoints: [{ service: "Microsoft.Storage" }] },
    ],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a virtual network in the specified resource group.
 *
 * @summary creates or updates a virtual network in the specified resource group.
 * x-ms-original-file: 2025-05-01/VirtualNetworkCreateSubnet.json
 */
async function createVirtualNetworkWithSubnet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworks.createOrUpdate("rg1", "test-vnet", {
    location: "eastus",
    addressSpace: { addressPrefixes: ["10.0.0.0/16"] },
    subnets: [{ addressPrefix: "10.0.0.0/24" }],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a virtual network in the specified resource group.
 *
 * @summary creates or updates a virtual network in the specified resource group.
 * x-ms-original-file: 2025-05-01/VirtualNetworkCreateSubnetWithAddressPrefixes.json
 */
async function createVirtualNetworkWithSubnetContainingAddressPrefixes() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworks.createOrUpdate("rg1", "test-vnet", {
    location: "eastus",
    addressSpace: { addressPrefixes: ["10.0.0.0/16"] },
    subnets: [{ addressPrefixes: ["10.0.0.0/28", "10.0.1.0/28"] }],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a virtual network in the specified resource group.
 *
 * @summary creates or updates a virtual network in the specified resource group.
 * x-ms-original-file: 2025-05-01/VirtualNetworkCreateSubnetWithDelegation.json
 */
async function createVirtualNetworkWithDelegatedSubnets() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworks.createOrUpdate("rg1", "test-vnet", {
    location: "westcentralus",
    addressSpace: { addressPrefixes: ["10.0.0.0/16"] },
    subnets: [
      {
        addressPrefix: "10.0.0.0/24",
        delegations: [{ name: "myDelegation", serviceName: "Microsoft.Sql/managedInstances" }],
      },
    ],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a virtual network in the specified resource group.
 *
 * @summary creates or updates a virtual network in the specified resource group.
 * x-ms-original-file: 2025-05-01/VirtualNetworkCreateWithBgpCommunities.json
 */
async function createVirtualNetworkWithBgpCommunities() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworks.createOrUpdate("rg1", "test-vnet", {
    location: "eastus",
    addressSpace: { addressPrefixes: ["10.0.0.0/16"] },
    bgpCommunities: { virtualNetworkCommunity: "12076:20000" },
    subnets: [{ addressPrefix: "10.0.0.0/24" }],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a virtual network in the specified resource group.
 *
 * @summary creates or updates a virtual network in the specified resource group.
 * x-ms-original-file: 2025-05-01/VirtualNetworkCreateWithEncryption.json
 */
async function createVirtualNetworkWithEncryption() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworks.createOrUpdate("rg1", "test-vnet", {
    location: "eastus",
    addressSpace: { addressPrefixes: ["10.0.0.0/16"] },
    encryption: { enabled: true, enforcement: "AllowUnencrypted" },
    subnets: [{ addressPrefix: "10.0.0.0/24" }],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a virtual network in the specified resource group.
 *
 * @summary creates or updates a virtual network in the specified resource group.
 * x-ms-original-file: 2025-05-01/VirtualNetworkCreateWithIpamPool.json
 */
async function createVirtualNetworkWithIpamPool() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworks.createOrUpdate("rg1", "test-vnet", {
    location: "eastus",
    addressSpace: {
      ipamPoolPrefixAllocations: [
        {
          numberOfIpAddresses: "65536",
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/networkManagers/nm1/ipamPools/testIpamPool",
        },
      ],
    },
    subnets: [
      {
        ipamPoolPrefixAllocations: [
          {
            numberOfIpAddresses: "80",
            id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/networkManagers/nm1/ipamPools/testIpamPool",
          },
        ],
      },
    ],
  });
  console.log(result);
}

async function main() {
  await createVirtualNetwork();
  await createVirtualNetworkWithServiceEndpointsAndServiceEndpointPolicy();
  await createVirtualNetworkWithServiceEndpoints();
  await createVirtualNetworkWithSubnet();
  await createVirtualNetworkWithSubnetContainingAddressPrefixes();
  await createVirtualNetworkWithDelegatedSubnets();
  await createVirtualNetworkWithBgpCommunities();
  await createVirtualNetworkWithEncryption();
  await createVirtualNetworkWithIpamPool();
}

main().catch(console.error);
