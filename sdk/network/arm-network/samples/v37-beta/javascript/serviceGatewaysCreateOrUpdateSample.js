// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a service gateway.
 *
 * @summary creates or updates a service gateway.
 * x-ms-original-file: 2025-05-01/ServiceGatewayCreate.json
 */
async function createServiceGateway() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.serviceGateways.createOrUpdate("rg1", "sg", {
    location: "eastus",
    routeTargetAddress: {
      privateIPAddress: "10.0.1.4",
      privateIPAllocationMethod: "Static",
      subnet: {
        id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/vnet/subnets/subnet",
      },
    },
    virtualNetwork: {
      id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/vnet",
    },
  });
  console.log(result);
}

async function main() {
  await createServiceGateway();
}

main().catch(console.error);
