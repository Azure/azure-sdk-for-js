// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceClient } from "@azure/arm-containerservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates tags on a snapshot.
 *
 * @summary updates tags on a snapshot.
 * x-ms-original-file: 2025-10-02-preview/SnapshotsUpdateTags.json
 */
async function updateSnapshotTags(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.snapshots.updateTags("rg1", "snapshot1", {
    tags: { key2: "new-val2", key3: "val3" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updateSnapshotTags();
}

main().catch(console.error);
