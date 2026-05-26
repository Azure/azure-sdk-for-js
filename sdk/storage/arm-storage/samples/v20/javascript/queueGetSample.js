// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the queue with the specified queue name, under the specified account if it exists.
 *
 * @summary gets the queue with the specified queue name, under the specified account if it exists.
 * x-ms-original-file: 2025-08-01/QueueOperationGet.json
 */
async function queueOperationGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.queue.get("res3376", "sto328", "queue6185");
  console.log(result);
}

async function main() {
  await queueOperationGet();
}

main().catch(console.error);
