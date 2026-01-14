// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary authenticate using an account name and a static key
 * @azsdk-weight 100
 */

import { QueueServiceClient, StorageSharedKeyCredential } from "@azure/storage-queue";
import { StorageManagementClient } from "@azure/arm-storage";
import { DefaultAzureCredential } from "@azure/identity";

// Load the .env file if it exists
import "dotenv/config";

async function getAccountKey(accountName: string): Promise<string> {
  const accountKey = process.env.ACCOUNT_KEY;
  if (accountKey) {
    return accountKey;
  }
  const subscriptionId = process.env.SUBSCRIPTION_ID;
  const resourceGroupName = process.env.RESOURCE_GROUP;
  if (!subscriptionId || !resourceGroupName || !accountName) {
    throw new Error(
      "Either ACCOUNT_KEY or SUBSCRIPTION_ID + RESOURCE_GROUP + ACCOUNT_NAME environment variable is required.",
    );
  }
  const mgmtClient = new StorageManagementClient(new DefaultAzureCredential(), subscriptionId);
  const { keys } = await mgmtClient.storageAccounts.listKeys(resourceGroupName, accountName);
  const key = keys?.[0].value;
  if (!key) {
    throw new Error("Cannot get account key from storage account");
  }
  return key;
}

async function main(): Promise<void> {
  // Enter your storage account name
  const accountName = process.env.ACCOUNT_NAME;
  if (!accountName) {
    throw new Error("ACCOUNT_NAME environment variable is not set.");
  }

  // Use StorageSharedKeyCredential with storage account and account key
  // StorageSharedKeyCredential is only available in Node.js runtime, not in browsers
  const sharedKeyCredential = new StorageSharedKeyCredential(
    accountName,
    await getAccountKey(accountName),
  );

  // List queues
  const queueServiceClient = new QueueServiceClient(
    `https://${accountName}.queue.core.windows.net`,
    sharedKeyCredential,
  );

  let i = 1;
  for await (const queue of queueServiceClient.listQueues()) {
    console.log(`Queue ${i++}: ${queue.name}`);
  }

  // Create a queue
  const queueName = `newqueue${new Date().getTime()}`;
  const queueClient = queueServiceClient.getQueueClient(queueName);

  const createQueueResponse = await queueClient.create();
  console.log(`Create queue ${queueName} successfully`, createQueueResponse.requestId);

  // Delete queue
  await queueClient.delete();

  console.log("deleted queue");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
