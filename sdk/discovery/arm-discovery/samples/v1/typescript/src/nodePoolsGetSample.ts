// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DiscoveryClient } from "@azure/arm-discovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a NodePool
 *
 * @summary get a NodePool
 * x-ms-original-file: 2026-06-01/NodePools_Get_MaximumSet_Gen.json
 */
async function nodePoolsGetMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "A54D43BD-2F5F-4BB1-95D4-9A8D23CC7DD4";
  const client = new DiscoveryClient(credential, subscriptionId);
  const result = await client.nodePools.get(
    "rgdiscovery",
    "68ccaea8f927d3c9d7",
    "f86825f20c4fb1d2fc",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await nodePoolsGetMaximumSet();
}

main().catch(console.error);
