// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ElasticSanClient } from "@azure/arm-elasticsan";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a Volume Snapshot.
 *
 * @summary create a Volume Snapshot.
 * x-ms-original-file: 2024-07-01-preview/VolumeSnapshots_Create_MaximumSet_Gen.json
 */
async function volumeSnapshotsCreateMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionid";
  const client = new ElasticSanClient(credential, subscriptionId);
  const result = await client.volumeSnapshots.create(
    "resourcegroupname",
    "elasticsanname",
    "volumegroupname",
    "snapshotname",
    {
      properties: {
        creationData: {
          sourceId:
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ElasticSan/elasticSans/{elasticSanName}/volumegroups/{volumeGroupName}/volumes/{volumeName}",
        },
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create a Volume Snapshot.
 *
 * @summary create a Volume Snapshot.
 * x-ms-original-file: 2024-07-01-preview/VolumeSnapshots_Create_MinimumSet_Gen.json
 */
async function volumeSnapshotsCreateMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionid";
  const client = new ElasticSanClient(credential, subscriptionId);
  const result = await client.volumeSnapshots.create(
    "resourcegroupname",
    "elasticsanname",
    "volumegroupname",
    "snapshotname",
    {
      properties: {
        creationData: {
          sourceId:
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ElasticSan/elasticSans/{elasticSanName}/volumegroups/{volumeGroupName}/volumes/{volumeName}",
        },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await volumeSnapshotsCreateMaximumSetGen();
  await volumeSnapshotsCreateMinimumSetGen();
}

main().catch(console.error);
