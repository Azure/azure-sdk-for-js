// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DiscoveryClient } from "@azure/arm-discovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list Supercomputer resources by resource group
 *
 * @summary list Supercomputer resources by resource group
 * x-ms-original-file: 2026-06-01/Supercomputers_ListByResourceGroup_MaximumSet_Gen.json
 */
async function supercomputersListByResourceGroupMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "A54D43BD-2F5F-4BB1-95D4-9A8D23CC7DD4";
  const client = new DiscoveryClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.supercomputers.listByResourceGroup("rgdiscovery")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await supercomputersListByResourceGroupMaximumSet();
}

main().catch(console.error);
