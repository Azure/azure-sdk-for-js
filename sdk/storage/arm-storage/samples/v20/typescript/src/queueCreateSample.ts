// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementClient } from "@azure/arm-storage";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates a new queue with the specified queue name, under the specified account.
 *
 * @summary creates a new queue with the specified queue name, under the specified account.
 * x-ms-original-file: 2025-08-01/QueueOperationPut.json
 */
async function queueOperationPut(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.queue.create("res3376", "sto328", "queue6185", {});
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new queue with the specified queue name, under the specified account.
 *
 * @summary creates a new queue with the specified queue name, under the specified account.
 * x-ms-original-file: 2025-08-01/QueueOperationPutWithMetadata.json
 */
async function queueOperationPutWithMetadata(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.queue.create("res3376", "sto328", "queue6185", {
    metadata: { sample1: "meta1", sample2: "meta2" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await queueOperationPut();
  await queueOperationPutWithMetadata();
}

main().catch(console.error);
