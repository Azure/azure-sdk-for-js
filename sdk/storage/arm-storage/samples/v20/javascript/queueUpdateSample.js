// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates a new queue with the specified queue name, under the specified account.
 *
 * @summary creates a new queue with the specified queue name, under the specified account.
 * x-ms-original-file: 2025-08-01/QueueOperationPatch.json
 */
async function queueOperationPatch() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.queue.update("res3376", "sto328", "queue6185", {});
  console.log(result);
}

async function main() {
  await queueOperationPatch();
}

main().catch(console.error);
