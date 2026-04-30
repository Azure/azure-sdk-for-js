// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { TagsObject} from "@azure/arm-network";
import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Updates an VirtualNetworkTap tags.
 *
 * @summary Updates an VirtualNetworkTap tags.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/VirtualNetworkTapUpdateTags.json
 */
async function updateVirtualNetworkTapTags(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const tapName = "test-vtap";
  const tapParameters: TagsObject = {
    tags: { tag1: "value1", tag2: "value2" },
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworkTaps.updateTags(
    resourceGroupName,
    tapName,
    tapParameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateVirtualNetworkTapTags();
}

main().catch(console.error);
