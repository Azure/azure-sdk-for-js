// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the specified IpAllocation by resource group.
 *
 * @summary gets the specified IpAllocation by resource group.
 * x-ms-original-file: 2025-05-01/IpAllocationGet.json
 */
async function getIpAllocation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.ipAllocations.get("rg1", "test-ipallocation");
  console.log(result);
}

async function main(): Promise<void> {
  await getIpAllocation();
}

main().catch(console.error);
