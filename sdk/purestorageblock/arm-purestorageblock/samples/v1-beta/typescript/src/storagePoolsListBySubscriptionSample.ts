// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BlockClient } from "@azure/arm-purestorageblock";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list storage pools by Azure subscription ID
 *
 * @summary list storage pools by Azure subscription ID
 * x-ms-original-file: 2026-01-01-preview/StoragePools_ListBySubscription_MaximumSet_Gen.json
 */
async function storagePoolsListBySubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
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
