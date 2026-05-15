// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list Associated Resource in the Pool.
 *
 * @summary list Associated Resource in the Pool.
 * x-ms-original-file: 2025-05-01/IpamPools_ListAssociatedResources.json
 */
async function ipamPoolsListAssociatedResources(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.ipamPools.listAssociatedResources(
    "rg1",
    "TestNetworkManager",
    "TestPool",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await ipamPoolsListAssociatedResources();
}

main().catch(console.error);
