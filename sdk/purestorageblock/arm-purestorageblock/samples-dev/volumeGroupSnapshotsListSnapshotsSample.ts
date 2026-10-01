// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BlockClient } from "@azure/arm-purestorageblock";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list all snapshots for a given volume group using POST with the same request and response contract
 *
 * @summary list all snapshots for a given volume group using POST with the same request and response contract
 * x-ms-original-file: 2026-05-01-preview/VolumeGroupSnapshots_ListSnapshots_MaximumSet_Gen.json
 */
async function volumeGroupSnapshotsListSnapshots(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new BlockClient(credential, subscriptionId);
  const result = await client.volumeGroupSnapshots.listSnapshots(
    "rgpurestorage",
    "storagepool-01",
    "volumegroup-01",
    { filter: "substringof('snapshot', name)", orderby: "name asc", top: 10, skip: 0 },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await volumeGroupSnapshotsListSnapshots();
}

main().catch(console.error);
