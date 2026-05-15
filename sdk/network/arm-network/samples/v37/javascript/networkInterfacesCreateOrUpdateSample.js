// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a network interface.
 *
 * @summary creates or updates a network interface.
 * x-ms-original-file: 2025-05-01/NetworkInterfaceCreate.json
 */
async function createNetworkInterface() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkInterfaces.createOrUpdate("rg1", "test-nic", {
    location: "eastus",
    disableTcpStateTracking: true,
    enableAcceleratedNetworking: true,
    ipConfigurations: [
      {
        publicIPAddress: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/publicIPAddresses/test-ip",
        },
        subnet: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/rg1-vnet/subnets/default",
        },
      },
      { privateIPAddressPrefixLength: 28 },
    ],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a network interface.
 *
 * @summary creates or updates a network interface.
 * x-ms-original-file: 2025-05-01/NetworkInterfaceCreateGatewayLoadBalancerConsumer.json
 */
async function createNetworkInterfaceWithGatewayLoadBalancerConsumerConfigured() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkInterfaces.createOrUpdate("rg1", "test-nic", {
    location: "eastus",
    enableAcceleratedNetworking: true,
    ipConfigurations: [
      {
        gatewayLoadBalancer: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/loadBalancers/lb/frontendIPConfigurations/fe-lb-provider",
        },
        publicIPAddress: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/publicIPAddresses/test-ip",
        },
        subnet: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/rg1-vnet/subnets/default",
        },
      },
    ],
  });
  console.log(result);
}

async function main() {
  await createNetworkInterface();
  await createNetworkInterfaceWithGatewayLoadBalancerConsumerConfigured();
}

main().catch(console.error);
