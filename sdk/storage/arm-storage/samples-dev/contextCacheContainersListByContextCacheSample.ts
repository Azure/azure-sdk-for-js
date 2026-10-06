// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementClient } from "@azure/arm-storage";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list all containers in a Context Cache.
 *
 * @summary list all containers in a Context Cache.
 * x-ms-original-file: 2026-06-01/StorageContextCacheContainerCRUD/ContextCacheContainers_ListByContextCache.json
 */
async function listContextCacheContainersInAContextCache(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.contextCacheContainers.listByContextCache(
    "testrg",
    "testaccount",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listContextCacheContainersInAContextCache();
}

main().catch(console.error);
