// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates a VirtualHub resource if it doesn't exist else updates the existing VirtualHub.
 *
 * @summary creates a VirtualHub resource if it doesn't exist else updates the existing VirtualHub.
 * x-ms-original-file: 2025-05-01/VirtualHubPut.json
 */
async function virtualHubPut(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualHubs.createOrUpdate("rg1", "virtualHub2", {
    location: "West US",
    addressPrefix: "10.168.0.0/24",
    sku: "Basic",
    virtualWan: {
      id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualWans/virtualWan1",
    },
    tags: { key1: "value1" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await virtualHubPut();
}

main().catch(console.error);
