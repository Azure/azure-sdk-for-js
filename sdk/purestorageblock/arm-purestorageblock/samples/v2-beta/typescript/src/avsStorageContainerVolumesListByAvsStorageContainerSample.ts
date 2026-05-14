// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BlockClient } from "@azure/arm-purestorageblock";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list volumes in an AVS storage container
 *
 * @summary list volumes in an AVS storage container
 * x-ms-original-file: 2026-01-01-preview/AvsStorageContainerVolumes_ListByAvsStorageContainer_MaximumSet_Gen.json
 */
async function avsStorageContainerVolumesListByAvsStorageContainer(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new BlockClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.avsStorageContainerVolumes.listByAvsStorageContainer(
    "rgpurestorage",
    "storagepool-01",
    "container-01",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await avsStorageContainerVolumesListByAvsStorageContainer();
}

main().catch(console.error);
