// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates an Interconnect Block. When updating an Interconnect Block, only tags and sku.capacity may be modified.
 *
 * @summary updates an Interconnect Block. When updating an Interconnect Block, only tags and sku.capacity may be modified.
 * x-ms-original-file: 2026-03-01/interconnectBlockExamples/InterconnectBlocks_Update.json
 */
async function updateAnInterconnectBlock(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.interconnectBlocks.update("myResourceGroup", "myInterconnectBlock", {
    tags: { department: "Engineering" },
    sku: { name: "Standard_ND128isr_GB300_v6", capacity: 36 },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updateAnInterconnectBlock();
}

main().catch(console.error);
