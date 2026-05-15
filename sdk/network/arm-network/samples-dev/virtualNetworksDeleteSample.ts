// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the specified virtual network.
 *
 * @summary deletes the specified virtual network.
 * x-ms-original-file: 2025-05-01/VirtualNetworkDelete.json
 */
async function deleteVirtualNetwork(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.virtualNetworks.delete("rg1", "test-vnet");
}

async function main(): Promise<void> {
  await deleteVirtualNetwork();
}

main().catch(console.error);
