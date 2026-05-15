// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a VirtualNetworkTap
 *
 * @summary update a VirtualNetworkTap
 * x-ms-original-file: 2025-05-01/VirtualNetworkTapUpdateTags.json
 */
async function updateVirtualNetworkTapTags(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworkTaps.updateTags("rg1", "test-vtap", {
    tags: { tag1: "value1", tag2: "value2" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updateVirtualNetworkTapTags();
}

main().catch(console.error);
