// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementClient } from "@azure/arm-storage";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets the queue with the specified queue name, under the specified account if it exists.
 *
 * @summary Gets the queue with the specified queue name, under the specified account if it exists.
 * x-ms-original-file: specification/storage/resource-manager/Microsoft.Storage/stable/2025-01-01/examples/QueueOperationGet.json
 */
async function queueOperationGet(): Promise<void> {
  const subscriptionId =
    process.env["STORAGE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["STORAGE_RESOURCE_GROUP"] || "res3376";
  const accountName = "sto328";
  const queueName = "queue6185";
  const credential = new DefaultAzureCredential();
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.queue.get(
    resourceGroupName,
    accountName,
    queueName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await queueOperationGet();
}

main().catch(console.error);
