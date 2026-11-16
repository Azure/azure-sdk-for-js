// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DiscoveryClient } from "@azure/arm-discovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a NodePool
 *
 * @summary create a NodePool
 * x-ms-original-file: 2026-06-01/NodePools_CreateOrUpdate_MaximumSet_Gen.json
 */
async function nodePoolsCreateOrUpdateMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "A54D43BD-2F5F-4BB1-95D4-9A8D23CC7DD4";
  const client = new DiscoveryClient(credential, subscriptionId);
  const result = await client.nodePools.createOrUpdate(
    "rgdiscovery",
    "2fda614bbdadfee575",
    "932c7b8d4ff0c243b8",
    {
      properties: {
        subnetId:
          "/subscriptions/31735C59-6307-4464-8B80-3675223F23D2/providers/Microsoft.Network/virtualNetworks/virtualnetwork1/subnets/subnet1",
        vmSize: "Standard_NC24ads_A100_v4",
        maxNodeCount: 18,
        minNodeCount: 0,
        scaleSetPriority: "Regular",
        osDiskSizeGb: 610,
        imageCacheLowerThreshold: 4,
        imageCacheUpperThreshold: 92,
      },
      tags: { key7034: "obcmoprnvrxxcdbeokgwotr" },
      location: "uksouth",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await nodePoolsCreateOrUpdateMaximumSet();
}

main().catch(console.error);
