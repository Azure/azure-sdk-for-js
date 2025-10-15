// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-disk";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets information about a snapshot.
 *
 * @summary gets information about a snapshot.
 * x-ms-original-file: 2025-01-02/snapshotExamples/Snapshot_Get.json
 */
async function getInformationAboutASnapshot(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.snapshots.get("myResourceGroup", "mySnapshot");
  console.log(result);
}

/**
 * This sample demonstrates how to gets information about a snapshot.
 *
 * @summary gets information about a snapshot.
 * x-ms-original-file: 2025-01-02/snapshotExamples/Snapshot_GetIncrementalSnapshot.json
 */
async function getInformationAboutAnIncrementalSnapshot(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.snapshots.get("myResourceGroup", "myIncrementalSnapshot");
  console.log(result);
}

async function main(): Promise<void> {
  await getInformationAboutASnapshot();
  await getInformationAboutAnIncrementalSnapshot();
}

main().catch(console.error);
