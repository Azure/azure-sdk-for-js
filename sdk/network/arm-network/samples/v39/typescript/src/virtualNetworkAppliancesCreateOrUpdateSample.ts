// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a virtual network appliance.
 *
 * @summary creates or updates a virtual network appliance.
 * x-ms-original-file: 2026-03-01/VirtualNetworkAppliances_CreateOrUpdate.json
 */
async function createVirtualNetworkAppliance(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworkAppliances.createOrUpdate("rg1", "test-vna", {
    location: "eastus",
    bandwidthInGbps: 100,
    subnet: {
      id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/rg1-vnet/subnets/default",
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a virtual network appliance.
 *
 * @summary creates or updates a virtual network appliance.
 * x-ms-original-file: 2026-03-01/VirtualNetworkAppliances_CreateOrUpdate_WithCapacityProvider.json
 */
async function createVirtualNetworkApplianceWithCapacityProvider(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworkAppliances.createOrUpdate("rg1", "test-vna", {
    location: "eastus",
    bandwidthInGbps: 100,
    capacityProvider: {
      id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworkAppliances/test-vna2",
    },
    subnet: {
      id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/rg1-vnet/subnets/default",
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createVirtualNetworkAppliance();
  await createVirtualNetworkApplianceWithCapacityProvider();
}

main().catch(console.error);
