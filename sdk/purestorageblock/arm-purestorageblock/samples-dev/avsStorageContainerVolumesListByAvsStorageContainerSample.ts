// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BlockClient } from "@azure/arm-purestorageblock";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list volumes in an AVS storage container
 *
 * @summary list volumes in an AVS storage container
 * x-ms-original-file: 2024-11-01/AvsStorageContainerVolumes_ListByAvsStorageContainer_MaximumSet_Gen.json
 */
async function avsStorageContainerVolumesListByAvsStorageContainer(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "BC47D6CC-AA80-4374-86F8-19D94EC70666";
  const client = new BlockClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.avsStorageContainerVolumes.listByAvsStorageContainer(
    "rgpurestorage",
    "storagePoolname",
    "name",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await avsStorageContainerVolumesListByAvsStorageContainer();
}

main().catch(console.error);
