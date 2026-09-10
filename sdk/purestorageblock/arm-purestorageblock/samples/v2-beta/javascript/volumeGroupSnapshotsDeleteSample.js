// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BlockClient } = require("@azure/arm-purestorageblock");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a volume group snapshot
 *
 * @summary delete a volume group snapshot
 * x-ms-original-file: 2026-05-01-preview/VolumeGroupSnapshots_Delete_MaximumSet_Gen.json
 */
async function volumeGroupSnapshotsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new BlockClient(credential, subscriptionId);
  await client.volumeGroupSnapshots.delete(
    "rgpurestorage",
    "storagepool-01",
    "volumegroup-01",
    "snapshotdd",
  );
}

async function main() {
  await volumeGroupSnapshotsDelete();
}

main().catch(console.error);
