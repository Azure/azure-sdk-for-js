// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Creates a new queue with the specified queue name, under the specified account.
 *
 * @summary Creates a new queue with the specified queue name, under the specified account.
 * x-ms-original-file: specification/storage/resource-manager/Microsoft.Storage/stable/2025-01-01/examples/QueueOperationPatch.json
 */
async function queueOperationPatch() {
  const subscriptionId = process.env["STORAGE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["STORAGE_RESOURCE_GROUP"] || "res3376";
  const accountName = "sto328";
  const queueName = "queue6185";
  const queue = {};
  const credential = new DefaultAzureCredential();
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.queue.update(resourceGroupName, accountName, queueName, queue);
  console.log(result);
}

async function main() {
  await queueOperationPatch();
}

main().catch(console.error);
