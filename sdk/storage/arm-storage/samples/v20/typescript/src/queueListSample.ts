// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementClient } from "@azure/arm-storage";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a list of all the queues under the specified storage account
 *
 * @summary gets a list of all the queues under the specified storage account
 * x-ms-original-file: 2026-04-01/QueueOperationList.json
 */
async function queueOperationList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.queue.list("res9290", "sto328")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await queueOperationList();
}

main().catch(console.error);
