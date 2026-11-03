// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BlockClient } from "@azure/arm-purestorageblock";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to restores a volume group to a specific snapshot state, including volume structure and data
 *
 * @summary restores a volume group to a specific snapshot state, including volume structure and data
 * x-ms-original-file: 2026-05-01-preview/VolumeGroups_Overwrite_MaximumSet_Gen.json
 */
async function volumeGroupsOverwrite(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new BlockClient(credential, subscriptionId);
  await client.volumeGroups.overwrite("rgpurestorage", "storagepool-01", "volumegroup-01", {
    sourceSnapshotResourceId:
      "/subscriptions/11111111-1111-1111-1111-111111111111/resourceGroups/rgpurestorage/providers/PureStorage.Block/storagePools/storagepool-01/volumeGroups/volumegroup-01/snapshots/snapshot-01",
    sourceVolumeGroupResourceId:
      "/subscriptions/11111111-1111-1111-1111-111111111111/resourceGroups/rgpurestorage/providers/PureStorage.Block/storagePools/storagepool-01/volumeGroups/volumegroup-01",
  });
}

async function main(): Promise<void> {
  await volumeGroupsOverwrite();
}

main().catch(console.error);
