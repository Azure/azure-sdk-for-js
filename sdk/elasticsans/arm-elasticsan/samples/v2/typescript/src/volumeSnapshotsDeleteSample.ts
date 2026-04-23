// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ElasticSanManagement } from "@azure/arm-elasticsan";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a Volume Snapshot.
 *
 * @summary delete a Volume Snapshot.
 * x-ms-original-file: 2025-09-01/VolumeSnapshots_Delete_MaximumSet_Gen.json
 */
async function volumeSnapshotsDeleteMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionid";
  const client = new ElasticSanManagement(credential, subscriptionId);
  await client.volumeSnapshots.delete(
    "resourcegroupname",
    "elasticsanname",
    "volumegroupname",
    "snapshotname",
  );
}

/**
 * This sample demonstrates how to delete a Volume Snapshot.
 *
 * @summary delete a Volume Snapshot.
 * x-ms-original-file: 2025-09-01/VolumeSnapshots_Delete_MinimumSet_Gen.json
 */
async function volumeSnapshotsDeleteMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionid";
  const client = new ElasticSanManagement(credential, subscriptionId);
  await client.volumeSnapshots.delete(
    "resourcegroupname",
    "elasticsanname",
    "volumegroupname",
    "snapshotname",
  );
}

async function main(): Promise<void> {
  await volumeSnapshotsDeleteMaximumSetGen();
  await volumeSnapshotsDeleteMinimumSetGen();
}

main().catch(console.error);
