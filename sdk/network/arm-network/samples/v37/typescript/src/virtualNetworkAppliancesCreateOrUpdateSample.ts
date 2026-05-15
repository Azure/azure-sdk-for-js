// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a virtual network appliance.
 *
 * @summary creates or updates a virtual network appliance.
 * x-ms-original-file: 2025-05-01/VirtualNetworkAppliances_CreateOrUpdate.json
 */
async function createVirtualNetworkAppliance(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworkAppliances.createOrUpdate("rg1", "test-vna", {
    location: "eastus",
    bandwidthInGbps: "100",
    subnet: {
      id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/rg1-vnet/subnets/default",
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createVirtualNetworkAppliance();
}

main().catch(console.error);
