// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Creates or updates a virtual network in the specified resource group.
 *
 * @summary Creates or updates a virtual network in the specified resource group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/VirtualNetworkCreate.json
 */
async function createVirtualNetwork() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const virtualNetworkName = "test-vnet";
  const parameters = {
    addressSpace: { addressPrefixes: ["10.0.0.0/16"] },
    flowTimeoutInMinutes: 10,
    location: "eastus",
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworks.beginCreateOrUpdateAndWait(
    resourceGroupName,
    virtualNetworkName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates or updates a virtual network in the specified resource group.
 *
 * @summary Creates or updates a virtual network in the specified resource group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/VirtualNetworkCreateWithBgpCommunities.json
 */
async function createVirtualNetworkWithBgpCommunities() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const virtualNetworkName = "test-vnet";
  const parameters = {
    addressSpace: { addressPrefixes: ["10.0.0.0/16"] },
    bgpCommunities: { virtualNetworkCommunity: "12076:20000" },
    location: "eastus",
    subnets: [{ name: "test-1", addressPrefix: "10.0.0.0/24" }],
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworks.beginCreateOrUpdateAndWait(
    resourceGroupName,
    virtualNetworkName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates or updates a virtual network in the specified resource group.
 *
 * @summary Creates or updates a virtual network in the specified resource group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/VirtualNetworkCreateSubnetWithDelegation.json
 */
async function createVirtualNetworkWithDelegatedSubnets() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subId";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const virtualNetworkName = "test-vnet";
  const parameters = {
    addressSpace: { addressPrefixes: ["10.0.0.0/16"] },
    location: "westcentralus",
    subnets: [
      {
        name: "test-1",
        addressPrefix: "10.0.0.0/24",
        delegations: [
          {
            name: "myDelegation",
            serviceName: "Microsoft.Sql/managedInstances",
          },
        ],
      },
    ],
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworks.beginCreateOrUpdateAndWait(
    resourceGroupName,
    virtualNetworkName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates or updates a virtual network in the specified resource group.
 *
 * @summary Creates or updates a virtual network in the specified resource group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/VirtualNetworkCreateWithEncryption.json
 */
async function createVirtualNetworkWithEncryption() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const virtualNetworkName = "test-vnet";
  const parameters = {
    addressSpace: { addressPrefixes: ["10.0.0.0/16"] },
    encryption: { enabled: true, enforcement: "AllowUnencrypted" },
    location: "eastus",
    subnets: [{ name: "test-1", addressPrefix: "10.0.0.0/24" }],
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworks.beginCreateOrUpdateAndWait(
    resourceGroupName,
    virtualNetworkName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates or updates a virtual network in the specified resource group.
 *
 * @summary Creates or updates a virtual network in the specified resource group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/VirtualNetworkCreateWithIpamPool.json
 */
async function createVirtualNetworkWithIpamPool() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const virtualNetworkName = "test-vnet";
  const parameters = {
    addressSpace: {
      ipamPoolPrefixAllocations: [
        {
          id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/networkManagers/nm1/ipamPools/testIpamPool",
          numberOfIpAddresses: "65536",
        },
      ],
    },
    location: "eastus",
    subnets: [
      {
        name: "test-1",
        ipamPoolPrefixAllocations: [
          {
            id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/networkManagers/nm1/ipamPools/testIpamPool",
            numberOfIpAddresses: "80",
          },
        ],
      },
    ],
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworks.beginCreateOrUpdateAndWait(
    resourceGroupName,
    virtualNetworkName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates or updates a virtual network in the specified resource group.
 *
 * @summary Creates or updates a virtual network in the specified resource group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/VirtualNetworkCreateServiceEndpoints.json
 */
async function createVirtualNetworkWithServiceEndpoints() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "vnetTest";
  const virtualNetworkName = "vnet1";
  const parameters = {
    addressSpace: { addressPrefixes: ["10.0.0.0/16"] },
    location: "eastus",
    subnets: [
      {
        name: "test-1",
        addressPrefix: "10.0.0.0/16",
        serviceEndpoints: [{ service: "Microsoft.Storage" }],
      },
    ],
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworks.beginCreateOrUpdateAndWait(
    resourceGroupName,
    virtualNetworkName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates or updates a virtual network in the specified resource group.
 *
 * @summary Creates or updates a virtual network in the specified resource group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/VirtualNetworkCreateServiceEndpointPolicy.json
 */
async function createVirtualNetworkWithServiceEndpointsAndServiceEndpointPolicy() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "vnetTest";
  const virtualNetworkName = "vnet1";
  const parameters = {
    addressSpace: { addressPrefixes: ["10.0.0.0/16"] },
    location: "eastus2euap",
    subnets: [
      {
        name: "test-1",
        addressPrefix: "10.0.0.0/16",
        serviceEndpointPolicies: [
          {
            id: "/subscriptions/subid/resourceGroups/vnetTest/providers/Microsoft.Network/serviceEndpointPolicies/ServiceEndpointPolicy1",
          },
        ],
        serviceEndpoints: [{ service: "Microsoft.Storage" }],
      },
    ],
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworks.beginCreateOrUpdateAndWait(
    resourceGroupName,
    virtualNetworkName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates or updates a virtual network in the specified resource group.
 *
 * @summary Creates or updates a virtual network in the specified resource group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/VirtualNetworkCreateSubnet.json
 */
async function createVirtualNetworkWithSubnet() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const virtualNetworkName = "test-vnet";
  const parameters = {
    addressSpace: { addressPrefixes: ["10.0.0.0/16"] },
    location: "eastus",
    subnets: [{ name: "test-1", addressPrefix: "10.0.0.0/24" }],
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworks.beginCreateOrUpdateAndWait(
    resourceGroupName,
    virtualNetworkName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates or updates a virtual network in the specified resource group.
 *
 * @summary Creates or updates a virtual network in the specified resource group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/VirtualNetworkCreateSubnetWithAddressPrefixes.json
 */
async function createVirtualNetworkWithSubnetContainingAddressPrefixes() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const virtualNetworkName = "test-vnet";
  const parameters = {
    addressSpace: { addressPrefixes: ["10.0.0.0/16"] },
    location: "eastus",
    subnets: [{ name: "test-2", addressPrefixes: ["10.0.0.0/28", "10.0.1.0/28"] }],
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworks.beginCreateOrUpdateAndWait(
    resourceGroupName,
    virtualNetworkName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await createVirtualNetwork();
  await createVirtualNetworkWithBgpCommunities();
  await createVirtualNetworkWithDelegatedSubnets();
  await createVirtualNetworkWithEncryption();
  await createVirtualNetworkWithIpamPool();
  await createVirtualNetworkWithServiceEndpoints();
  await createVirtualNetworkWithServiceEndpointsAndServiceEndpointPolicy();
  await createVirtualNetworkWithSubnet();
  await createVirtualNetworkWithSubnetContainingAddressPrefixes();
}

main().catch(console.error);
