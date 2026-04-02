// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DiscoveryClient } from "@azure/arm-discovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a NodePool
 *
 * @summary create a NodePool
 * x-ms-original-file: 2026-02-01-preview/NodePools_CreateOrUpdate_MaximumSet_Gen.json
 */
async function nodePoolsCreateOrUpdateMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "C058B75F-64D2-4E9D-8B66-65339DCB22C7";
  const client = new DiscoveryClient(credential, subscriptionId);
  const result = await client.nodePools.createOrUpdate(
    "rgdiscovery",
    "8074da5c77f95509a8",
    "5a88c24ec4e7091650",
    {
      properties: {
        subnetId:
          "/subscriptions/31735C59-6307-4464-8B80-3675223F23D2/providers/Microsoft.Network/virtualNetworks/virtualnetwork1/subnets/subnet1",
        vmSize: "Standard_NC24ads_A100_v4",
        maxNodeCount: 4,
        minNodeCount: 0,
        scaleSetPriority: "Regular",
      },
      tags: { key6074: "qlnvwgazrqmwauqqvxntjtoye" },
      location: "uksouth",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await nodePoolsCreateOrUpdateMaximumSet();
}

main().catch(console.error);
