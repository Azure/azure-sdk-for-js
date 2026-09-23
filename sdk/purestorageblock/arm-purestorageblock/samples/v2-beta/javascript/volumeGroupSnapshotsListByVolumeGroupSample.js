// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BlockClient } = require("@azure/arm-purestorageblock");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all snapshots for a given volume group
 *
 * @summary list all snapshots for a given volume group
 * x-ms-original-file: 2026-05-01-preview/VolumeGroupSnapshots_ListByVolumeGroup_MaximumSet_Gen.json
 */
async function volumeGroupSnapshotsListByVolumeGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new BlockClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.volumeGroupSnapshots.listByVolumeGroup(
    "rgpurestorage",
    "storagepool-01",
    "volumegroup-01",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await volumeGroupSnapshotsListByVolumeGroup();
}

main().catch(console.error);
