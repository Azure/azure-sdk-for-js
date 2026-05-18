// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BlockClient } from "@azure/arm-purestorageblock";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a volume in an AVS storage container
 *
 * @summary update a volume in an AVS storage container
 * x-ms-original-file: 2026-01-01-preview/AvsStorageContainerVolumes_Update_MaximumSet_Gen.json
 */
async function avsStorageContainerVolumesUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new BlockClient(credential, subscriptionId);
  const result = await client.avsStorageContainerVolumes.update(
    "rgpurestorage",
    "storagepool-01",
    "container-01",
    "a1b2c3d4-e5f6",
    { properties: { softDeletion: { destroyed: true } } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await avsStorageContainerVolumesUpdate();
}

main().catch(console.error);
