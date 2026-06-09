// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementClient } from "@azure/arm-storage";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the queue with the specified queue name, under the specified account if it exists.
 *
 * @summary deletes the queue with the specified queue name, under the specified account if it exists.
 * x-ms-original-file: 2026-04-01/QueueOperationDelete.json
 */
async function queueOperationDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  await client.queue.delete("res3376", "sto328", "queue6185");
}

async function main(): Promise<void> {
  await queueOperationDelete();
}

main().catch(console.error);
