// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BlockClient } from "@azure/arm-purestorageblock";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list storage pools by Azure subscription ID
 *
 * @summary list storage pools by Azure subscription ID
 * x-ms-original-file: 2024-11-01/StoragePools_ListBySubscription_MaximumSet_Gen.json
 */
async function storagePoolsListBySubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "BC47D6CC-AA80-4374-86F8-19D94EC70666";
  const client = new BlockClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.storagePools.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await storagePoolsListBySubscription();
}

main().catch(console.error);
