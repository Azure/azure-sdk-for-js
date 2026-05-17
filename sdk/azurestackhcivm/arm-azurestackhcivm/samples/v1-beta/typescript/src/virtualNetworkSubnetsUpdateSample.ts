// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIVMManagementClient } from "@azure/arm-azurestackhcivm";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to update a virtual network subnet.
 *
 * @summary the operation to update a virtual network subnet.
 * x-ms-original-file: 2026-04-01-preview/VirtualNetworkSubnets_Update.json
 */
async function updateVirtualNetworkUpdates(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIVMManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworkSubnets.update("test-rg", "test-vnet", "subnet1", {
    properties: {
      networkSecurityGroup: {
        id: "/subscriptions/fd3c3665-1729-4b7b-9a38-238e83b0f98b/resourceGroups/dogfoodarc/providers/Microsoft.AzureStackHCI/networkSecurityGroups/testnsg",
      },
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updateVirtualNetworkUpdates();
}

main().catch(console.error);
