// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates the specific Pool resource.
 *
 * @summary updates the specific Pool resource.
 * x-ms-original-file: 2026-01-01/IpamPools_Update.json
 */
async function ipamPoolsUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.ipamPools.update("rg1", "TestNetworkManager", "TestPool");
  console.log(result);
}

/**
 * This sample demonstrates how to updates the specific Pool resource.
 *
 * @summary updates the specific Pool resource.
 * x-ms-original-file: 2026-01-01/IpamPools_UpdateAllocationBounds.json
 */
async function updateTheAllocationSizeBoundsOnAPoolResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.ipamPools.update("rg1", "TestNetworkManager", "TestPool");
  console.log(result);
}

/**
 * This sample demonstrates how to updates the specific Pool resource.
 *
 * @summary updates the specific Pool resource.
 * x-ms-original-file: 2026-01-01/IpamPools_UpdateClearAllocationBounds.json
 */
async function clearTheAllocationSizeBoundsOnAPoolResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.ipamPools.update("rg1", "TestNetworkManager", "TestPool");
  console.log(result);
}

async function main(): Promise<void> {
  await ipamPoolsUpdate();
  await updateTheAllocationSizeBoundsOnAPoolResource();
  await clearTheAllocationSizeBoundsOnAPoolResource();
}

main().catch(console.error);
