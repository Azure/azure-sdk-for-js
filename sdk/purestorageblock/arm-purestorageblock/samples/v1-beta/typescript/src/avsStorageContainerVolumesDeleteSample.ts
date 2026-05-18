// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BlockClient } from "@azure/arm-purestorageblock";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a volume in an AVS storage container
 *
 * @summary delete a volume in an AVS storage container
 * x-ms-original-file: 2026-01-01-preview/AvsStorageContainerVolumes_Delete_MaximumSet_Gen.json
 */
async function avsStorageContainerVolumesDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new BlockClient(credential, subscriptionId);
  await client.avsStorageContainerVolumes.delete(
    "rgpurestorage",
    "storagepool-01",
    "container-01",
    "a1b2c3d4-e5f6",
  );
}

async function main(): Promise<void> {
  await avsStorageContainerVolumesDelete();
}

main().catch(console.error);
