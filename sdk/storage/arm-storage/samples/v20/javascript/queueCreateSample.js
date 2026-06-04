// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates a new queue with the specified queue name, under the specified account.
 *
 * @summary creates a new queue with the specified queue name, under the specified account.
 * x-ms-original-file: 2026-04-01/QueueOperationPut.json
 */
async function queueOperationPut() {
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
 * x-ms-original-file: 2026-04-01/QueueOperationPutWithMetadata.json
 */
async function queueOperationPutWithMetadata() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.queue.create("res3376", "sto328", "queue6185", {
    metadata: { sample1: "meta1", sample2: "meta2" },
  });
  console.log(result);
}

async function main() {
  await queueOperationPut();
  await queueOperationPutWithMetadata();
}

main().catch(console.error);
