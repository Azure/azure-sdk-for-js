// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a VirtualNetworkTap
 *
 * @summary create a VirtualNetworkTap
 * x-ms-original-file: 2025-05-01/VirtualNetworkTapCreate.json
 */
async function createVirtualNetworkTap(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworkTaps.createOrUpdate("rg1", "test-vtap", {
    location: "centraluseuap",
    destinationNetworkInterfaceIPConfiguration: {
      id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/networkInterfaces/testNetworkInterface/ipConfigurations/ipconfig1",
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createVirtualNetworkTap();
}

main().catch(console.error);
