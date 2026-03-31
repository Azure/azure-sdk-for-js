// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates a VirtualHubIpConfiguration resource if it doesn't exist else updates the existing VirtualHubIpConfiguration.
 *
 * @summary creates a VirtualHubIpConfiguration resource if it doesn't exist else updates the existing VirtualHubIpConfiguration.
 * x-ms-original-file: 2025-05-01/VirtualHubIpConfigurationPut.json
 */
async function virtualHubIpConfigurationPut(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualHubIpConfiguration.createOrUpdate("rg1", "hub1", "ipconfig1", {
    subnet: {
      id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/vnet1/subnets/subnet1",
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await virtualHubIpConfigurationPut();
}

main().catch(console.error);
