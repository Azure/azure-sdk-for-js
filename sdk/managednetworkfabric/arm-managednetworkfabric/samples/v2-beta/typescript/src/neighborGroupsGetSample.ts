// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagedNetworkFabricClient } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the Neighbor Group.
 *
 * @summary gets the Neighbor Group.
 * x-ms-original-file: 2024-06-15-preview/NeighborGroups_Get.json
 */
async function neighborGroupsGetMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const result = await client.neighborGroups.get("example-rg", "example-neighborGroup");
  console.log(result);
}

async function main(): Promise<void> {
  await neighborGroupsGetMaximumSetGen();
}

main().catch(console.error);
