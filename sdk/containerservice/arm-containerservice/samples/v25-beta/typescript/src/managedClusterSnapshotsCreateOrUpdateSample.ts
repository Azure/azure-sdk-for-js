// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceClient } from "@azure/arm-containerservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a managed cluster snapshot.
 *
 * @summary creates or updates a managed cluster snapshot.
 * x-ms-original-file: 2025-10-02-preview/ManagedClusterSnapshotsCreate.json
 */
async function createOrUpdateManagedClusterSnapshot(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.managedClusterSnapshots.createOrUpdate("rg1", "snapshot1", {
    location: "westus",
    creationData: {
      sourceResourceId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/rg1/providers/Microsoft.ContainerService/managedClusters/cluster1",
    },
    tags: { key1: "val1", key2: "val2" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateManagedClusterSnapshot();
}

main().catch(console.error);
