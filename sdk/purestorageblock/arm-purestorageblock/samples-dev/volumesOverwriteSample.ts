// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BlockClient } from "@azure/arm-purestorageblock";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to overwrites the content of a volume from another volume or a snapshot
 *
 * @summary overwrites the content of a volume from another volume or a snapshot
 * x-ms-original-file: 2026-05-01-preview/Volumes_Overwrite_MaximumSet_Gen.json
 */
async function volumesOverwrite(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new BlockClient(credential, subscriptionId);
  await client.volumes.overwrite("rgpurestorage", "storagepool-01", "volumegroup-01", "volume-01", {
    sourceType: "snapshot",
    sourceVolumeGroupResourceId:
      "/subscriptions/11111111-1111-1111-1111-111111111111/resourceGroups/rgpurestorage/providers/PureStorage.Block/storagePools/storagepool-01/volumeGroups/volumegroup-01",
    sourceVolumeSnapshot: {
      volumeGroupSnapshotResourceId:
        "/subscriptions/11111111-1111-1111-1111-111111111111/resourceGroups/rgpurestorage/providers/PureStorage.Block/storagePools/storagepool-01/volumeGroups/volumegroup-01/snapshots/snapshot-01",
      volumeSnapshotName: "volume-01",
    },
  });
}

async function main(): Promise<void> {
  await volumesOverwrite();
}

main().catch(console.error);
