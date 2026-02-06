// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceClient } from "@azure/arm-containerservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates tags on a managed cluster snapshot.
 *
 * @summary updates tags on a managed cluster snapshot.
 * x-ms-original-file: 2025-10-02-preview/ManagedClusterSnapshotsUpdateTags.json
 */
async function updateManagedClusterSnapshotTags(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.managedClusterSnapshots.updateTags("rg1", "snapshot1", {
    tags: { key2: "new-val2", key3: "val3" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updateManagedClusterSnapshotTags();
}

main().catch(console.error);
