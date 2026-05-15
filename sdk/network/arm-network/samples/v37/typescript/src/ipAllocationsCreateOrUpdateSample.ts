// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates an IpAllocation in the specified resource group.
 *
 * @summary creates or updates an IpAllocation in the specified resource group.
 * x-ms-original-file: 2025-05-01/IpAllocationCreate.json
 */
async function createIpAllocation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.ipAllocations.createOrUpdate("rg1", "test-ipallocation", {
    location: "centraluseuap",
    typePropertiesType: "Hypernet",
    allocationTags: {
      VNetID:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/HypernetVnet1",
    },
    prefix: "3.2.5.0/24",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createIpAllocation();
}

main().catch(console.error);
