// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list all Caches within the Capacity Pool
 *
 * @summary list all Caches within the Capacity Pool
 * x-ms-original-file: 2025-09-01-preview/Caches_ListByCapacityPools.json
 */
async function cachesList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.caches.listByCapacityPools("myRG", "account1", "pool1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await cachesList();
}

main().catch(console.error);
