// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ElasticSanManagement } from "@azure/arm-elasticsan";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a Volume Snapshot.
 *
 * @summary get a Volume Snapshot.
 * x-ms-original-file: 2025-09-01/VolumeSnapshots_Get_MaximumSet_Gen.json
 */
async function volumeSnapshotsGetMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionid";
  const client = new ElasticSanManagement(credential, subscriptionId);
  const result = await client.volumeSnapshots.get(
    "resourcegroupname",
    "elasticsanname",
    "volumegroupname",
    "snapshotname",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to get a Volume Snapshot.
 *
 * @summary get a Volume Snapshot.
 * x-ms-original-file: 2025-09-01/VolumeSnapshots_Get_MinimumSet_Gen.json
 */
async function volumeSnapshotsGetMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionid";
  const client = new ElasticSanManagement(credential, subscriptionId);
  const result = await client.volumeSnapshots.get(
    "resourcegroupname",
    "elasticsanname",
    "volumegroupname",
    "snapshotname",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await volumeSnapshotsGetMaximumSetGen();
  await volumeSnapshotsGetMinimumSetGen();
}

main().catch(console.error);
