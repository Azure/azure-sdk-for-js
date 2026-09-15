// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to move IP configurations from one virtual network to another.
 *
 * @summary move IP configurations from one virtual network to another.
 * x-ms-original-file: 2025-09-01/VirtualNetworkMoveIpConfigurations.json
 */
async function moveIPConfigurations(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.virtualNetworks.moveIpConfigurations("rg1", "test-vnet", {
    moveIpConfigurationItems: [
      {
        sourceIpConfiguration: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/networkInterfaces/nic1/ipConfigurations/ipconfig1",
        },
        targetIpConfiguration: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/networkInterfaces/nic2/ipConfigurations/ipconfig2",
        },
      },
      {
        sourceIpConfiguration: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/networkInterfaces/nic3/ipConfigurations/ipconfig3",
        },
        targetIpConfiguration: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/networkInterfaces/nic4/ipConfigurations/ipconfig4",
        },
      },
    ],
  });
}

async function main(): Promise<void> {
  await moveIPConfigurations();
}

main().catch(console.error);
