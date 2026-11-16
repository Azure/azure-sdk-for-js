// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DiscoveryClient } from "@azure/arm-discovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a NodePool
 *
 * @summary update a NodePool
 * x-ms-original-file: 2026-06-01/NodePools_Update_MaximumSet_Gen.json
 */
async function nodePoolsUpdateMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "A54D43BD-2F5F-4BB1-95D4-9A8D23CC7DD4";
  const client = new DiscoveryClient(credential, subscriptionId);
  const result = await client.nodePools.update(
    "rgdiscovery",
    "8e65e3461b33b01369",
    "2e50b6da812ce89198",
    { properties: { maxNodeCount: 24, minNodeCount: 0 }, tags: { key101: "dnegxftfhcehhkgcn" } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await nodePoolsUpdateMaximumSet();
}

main().catch(console.error);
