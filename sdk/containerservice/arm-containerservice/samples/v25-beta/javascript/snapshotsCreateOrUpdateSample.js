// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a snapshot.
 *
 * @summary creates or updates a snapshot.
 * x-ms-original-file: 2025-10-02-preview/SnapshotsCreate.json
 */
async function createOrUpdateSnapshot() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.snapshots.createOrUpdate("rg1", "snapshot1", {
    location: "westus",
    creationData: {
      sourceResourceId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/rg1/providers/Microsoft.ContainerService/managedClusters/cluster1/agentPools/pool0",
    },
    tags: { key1: "val1", key2: "val2" },
  });
  console.log(result);
}

async function main() {
  await createOrUpdateSnapshot();
}

main().catch(console.error);
