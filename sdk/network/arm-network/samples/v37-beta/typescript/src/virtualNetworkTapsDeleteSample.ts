// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a VirtualNetworkTap
 *
 * @summary delete a VirtualNetworkTap
 * x-ms-original-file: 2025-05-01/VirtualNetworkTapDelete.json
 */
async function deleteVirtualNetworkTapResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.virtualNetworkTaps.delete("rg1", "test-vtap");
}

async function main(): Promise<void> {
  await deleteVirtualNetworkTapResource();
}

main().catch(console.error);
