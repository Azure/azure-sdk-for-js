// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementClient } from "@azure/arm-storage";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates a new queue with the specified queue name, under the specified account.
 *
 * @summary creates a new queue with the specified queue name, under the specified account.
 * x-ms-original-file: 2026-04-01/QueueOperationPatch.json
 */
async function queueOperationPatch(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.queue.update("res3376", "sto328", "queue6185", {});
  console.log(result);
}

async function main(): Promise<void> {
  await queueOperationPatch();
}

main().catch(console.error);
