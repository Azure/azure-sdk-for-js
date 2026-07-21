// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageCacheManagementClient } from "@azure/arm-storagecache";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the list of StorageCache.Cache SKUs available to this subscription.
 *
 * @summary get the list of StorageCache.Cache SKUs available to this subscription.
 * x-ms-original-file: 2026-01-01/Skus_List.json
 */
async function skusList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageCacheManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.skus.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await skusList();
}

main().catch(console.error);
