// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageCacheManagementClient } = require("@azure/arm-storagecache");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update cache space allocation.
 *
 * @summary update cache space allocation.
 * x-ms-original-file: 2026-01-01/SpaceAllocation_Post.json
 */
async function spaceAllocationPost() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageCacheManagementClient(credential, subscriptionId);
  await client.caches.spaceAllocation("scgroup", "sc1", {
    spaceAllocationParameter: [
      { name: "st1", allocationPercentage: 25 },
      { name: "st2", allocationPercentage: 50 },
      { name: "st3", allocationPercentage: 25 },
    ],
  });
}

async function main() {
  await spaceAllocationPost();
}

main().catch(console.error);
