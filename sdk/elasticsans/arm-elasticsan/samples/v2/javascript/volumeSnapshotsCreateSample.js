// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ElasticSanManagement } = require("@azure/arm-elasticsan");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a Volume Snapshot.
 *
 * @summary create a Volume Snapshot.
 * x-ms-original-file: 2025-09-01/VolumeSnapshots_Create_MaximumSet_Gen.json
 */
async function volumeSnapshotsCreateMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionid";
  const client = new ElasticSanManagement(credential, subscriptionId);
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
 * x-ms-original-file: 2025-09-01/VolumeSnapshots_Create_MinimumSet_Gen.json
 */
async function volumeSnapshotsCreateMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionid";
  const client = new ElasticSanManagement(credential, subscriptionId);
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

async function main() {
  await volumeSnapshotsCreateMaximumSetGen();
  await volumeSnapshotsCreateMinimumSetGen();
}

main().catch(console.error);
