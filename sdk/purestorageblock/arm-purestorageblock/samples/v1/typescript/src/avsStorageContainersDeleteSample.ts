// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BlockClient } from "@azure/arm-purestorageblock";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete an AVS storage container
 *
 * @summary delete an AVS storage container
 * x-ms-original-file: 2024-11-01/AvsStorageContainers_Delete_MaximumSet_Gen.json
 */
async function avsStorageContainersDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "BC47D6CC-AA80-4374-86F8-19D94EC70666";
  const client = new BlockClient(credential, subscriptionId);
  await client.avsStorageContainers.delete(
    "rgpurestorage",
    "storagePoolName",
    "storageContainerName",
  );
}

async function main(): Promise<void> {
  await avsStorageContainersDelete();
}

main().catch(console.error);
