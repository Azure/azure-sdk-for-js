// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BlockClient } = require("@azure/arm-purestorageblock");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a manual snapshot of a volume group, or recover from an existing snapshot by providing sourceSnapshotResourceId
 *
 * @summary create a manual snapshot of a volume group, or recover from an existing snapshot by providing sourceSnapshotResourceId
 * x-ms-original-file: 2026-05-01-preview/VolumeGroupSnapshots_Create_MaximumSet_Gen.json
 */
async function volumeGroupSnapshotsCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new BlockClient(credential, subscriptionId);
  const result = await client.volumeGroupSnapshots.create(
    "rgpurestorage",
    "storagepool-01",
    "volumegroup-01",
    "snapshot-01",
    {
      properties: {
        sourceSnapshotResourceId:
          "/subscriptions/11111111-1111-1111-1111-111111111111/resourceGroups/rgpurestorage/providers/PureStorage.Block/storagePools/storagepool-01/volumeGroups/volumegroup-01/snapshots/snapshot-01",
      },
    },
  );
  console.log(result);
}

async function main() {
  await volumeGroupSnapshotsCreate();
}

main().catch(console.error);
