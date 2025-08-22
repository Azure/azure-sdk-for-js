// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to delete a volume in an AVS storage container
 *
 * @summary delete a volume in an AVS storage container
 * x-ms-original-file: 2024-11-01/AvsStorageContainerVolumes_Delete_MaximumSet_Gen.json
 */

import { BlockClient } from "@azure/arm-purestorageblock";
import { DefaultAzureCredential } from "@azure/identity";

async function avsStorageContainerVolumesDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "BC47D6CC-AA80-4374-86F8-19D94EC70666";
  const client = new BlockClient(credential, subscriptionId);
  await client.avsStorageContainerVolumes.delete(
    "rgpurestorage",
    "storagePoolname",
    "name",
    "cbdec-ddbb",
  );
}

async function main(): Promise<void> {
  await avsStorageContainerVolumesDelete();
}

main().catch(console.error);
