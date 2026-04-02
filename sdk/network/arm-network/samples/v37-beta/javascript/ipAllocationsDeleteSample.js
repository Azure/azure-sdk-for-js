// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the specified IpAllocation.
 *
 * @summary deletes the specified IpAllocation.
 * x-ms-original-file: 2025-05-01/IpAllocationDelete.json
 */
async function deleteIpAllocation() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.ipAllocations.delete("rg1", "test-ipallocation");
}

async function main() {
  await deleteIpAllocation();
}

main().catch(console.error);
