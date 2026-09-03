// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ElasticSanManagement } = require("@azure/arm-elasticsan");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list Snapshots in a VolumeGroup or List Snapshots by Volume (name) in a VolumeGroup using filter
 *
 * @summary list Snapshots in a VolumeGroup or List Snapshots by Volume (name) in a VolumeGroup using filter
 * x-ms-original-file: 2025-09-01/VolumeSnapshots_ListByVolumeGroup_MaximumSet_Gen.json
 */
async function volumeSnapshotsListByVolumeGroupMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionid";
  const client = new ElasticSanManagement(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.volumeSnapshots.listByVolumeGroup(
    "resourcegroupname",
    "elasticsanname",
    "volumegroupname",
    { filter: "volumeName eq <volume name>" },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list Snapshots in a VolumeGroup or List Snapshots by Volume (name) in a VolumeGroup using filter
 *
 * @summary list Snapshots in a VolumeGroup or List Snapshots by Volume (name) in a VolumeGroup using filter
 * x-ms-original-file: 2025-09-01/VolumeSnapshots_ListByVolumeGroup_MinimumSet_Gen.json
 */
async function volumeSnapshotsListByVolumeGroupMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionid";
  const client = new ElasticSanManagement(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.volumeSnapshots.listByVolumeGroup(
    "resourcegroupname",
    "elasticsanname",
    "volumegroupname",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await volumeSnapshotsListByVolumeGroupMaximumSetGen();
  await volumeSnapshotsListByVolumeGroupMinimumSetGen();
}

main().catch(console.error);
