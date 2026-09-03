// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BlockClient } = require("@azure/arm-purestorageblock");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a volume group snapshot
 *
 * @summary get a volume group snapshot
 * x-ms-original-file: 2026-05-01-preview/VolumeGroupSnapshots_Get_MaximumSet_Gen.json
 */
async function volumeGroupSnapshotsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new BlockClient(credential, subscriptionId);
  const result = await client.volumeGroupSnapshots.get(
    "rgpurestorage",
    "storagepool-01",
    "volumegroup-01",
    "01",
  );
  console.log(result);
}

async function main() {
  await volumeGroupSnapshotsGet();
}

main().catch(console.error);
