// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BlockClient } from "@azure/arm-purestorageblock";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get an AVS storage container
 *
 * @summary get an AVS storage container
 * x-ms-original-file: 2024-11-01/AvsStorageContainers_Get_MaximumSet_Gen.json
 */
async function avsStorageContainersGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "BC47D6CC-AA80-4374-86F8-19D94EC70666";
  const client = new BlockClient(credential, subscriptionId);
  const result = await client.avsStorageContainers.get(
    "rgpurestorage",
    "storagePoolName",
    "storageContainerName",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await avsStorageContainersGet();
}

main().catch(console.error);
