// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates an Interconnect Block. When updating an Interconnect Block, only tags and sku.capacity may be modified.
 *
 * @summary creates or updates an Interconnect Block. When updating an Interconnect Block, only tags and sku.capacity may be modified.
 * x-ms-original-file: 2026-03-01/interconnectBlockExamples/InterconnectBlocks_CreateOrUpdate.json
 */
async function createOrUpdateAnInterconnectBlockWithASpecificZone(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.interconnectBlocks.createOrUpdate(
    "myResourceGroup",
    "myInterconnectBlock",
    {
      location: "westus",
      tags: { department: "HR" },
      sku: { name: "Standard_ND128isr_GB300_v6", capacity: 18 },
      zones: ["1"],
      properties: {
        interconnectGroup: {
          id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/interconnectGroups/myInterconnectGroup",
        },
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates an Interconnect Block. When updating an Interconnect Block, only tags and sku.capacity may be modified.
 *
 * @summary creates or updates an Interconnect Block. When updating an Interconnect Block, only tags and sku.capacity may be modified.
 * x-ms-original-file: 2026-03-01/interconnectBlockExamples/InterconnectBlocks_CreateOrUpdate_AnyZone.json
 */
async function createOrUpdateAnInterconnectBlockWithAutomaticZonePlacement(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.interconnectBlocks.createOrUpdate(
    "myResourceGroup",
    "myInterconnectBlock",
    {
      location: "westus",
      tags: { department: "HR" },
      sku: { name: "Standard_ND128isr_GB300_v6", capacity: 18 },
      placement: { zonePlacementPolicy: "Any" },
      properties: {
        interconnectGroup: {
          id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/interconnectGroups/myInterconnectGroup",
        },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateAnInterconnectBlockWithASpecificZone();
  await createOrUpdateAnInterconnectBlockWithAutomaticZonePlacement();
}

main().catch(console.error);
