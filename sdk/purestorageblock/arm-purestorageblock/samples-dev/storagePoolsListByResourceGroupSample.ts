// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BlockClient } from "@azure/arm-purestorageblock";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list storage pools by resource group
 *
 * @summary list storage pools by resource group
 * x-ms-original-file: 2024-11-01/StoragePools_ListByResourceGroup_MaximumSet_Gen.json
 */
async function storagePoolsListByResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "BC47D6CC-AA80-4374-86F8-19D94EC70666";
  const client = new BlockClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.storagePools.listByResourceGroup("rgpurestorage")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await storagePoolsListByResourceGroup();
}

main().catch(console.error);
