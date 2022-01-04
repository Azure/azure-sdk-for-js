// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary authenticate using an account name and a static key
 * @azsdk-weight 100
 */

import { QueueServiceClient, StorageSharedKeyCredential } from "@azure/storage-queue";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

export async function main() {
  // Enter your storage account name and shared key
  const account = process.env.ACCOUNT_NAME || "";
  const accountKey = process.env.ACCOUNT_KEY || "";

  // Use StorageSharedKeyCredential with storage account and account key
  // StorageSharedKeyCredential is only avaiable in Node.js runtime, not in browsers
  const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);

  const queueServiceClient = new QueueServiceClient(
    `https://${account}.queue.core.windows.net`,
    sharedKeyCredential
  );

  // Create a new queue
  const queueName = `newqueue${new Date().getTime()}`;
  const queueClient = queueServiceClient.getQueueClient(queueName);
  const createQueueResponse = await queueClient.create();
  console.log(
    `Created queue ${queueClient.name} successfully, service assigned request Id: ${createQueueResponse.requestId}`
  );

  // Delete the queue.
  const deleteQueueResponse = await queueClient.delete();
  console.log(
    `Deleted queue ${queueClient.name} successfully, service assigned request Id: ${deleteQueueResponse.requestId}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
