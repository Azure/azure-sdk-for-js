// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary configure proxy settings when connecting to the storage service
 * @azsdk-weight 30
 */

import { StorageSharedKeyCredential, QueueServiceClient } from "@azure/storage-queue";

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

  // To use the manual proxyOptions below, remove this block
  if (!process.env.HTTP_PROXY || !process.env.HTTPS_PROXY) {
    console.warn("Proxy information not provided, but it is required to run this sample. Exiting.");
    return;
  }

  const queueServiceClient = new QueueServiceClient(
    `https://${account}.queue.core.windows.net`,
    sharedKeyCredential,
    // The library tries to load the proxy settings from the environment variables like HTTP_PROXY
    // Alternatively, the service client accepts the following `proxyOptions` as part of its options:
    {
      /*
      proxyOptions : {
        // To use these options, remove the section above that checks for HTTP_PROXY or HTTPS_PROXY
        host: "http://localhost",
        port: 3128,
        username: "<username>",
        password: "<password>"
      }
      */
    }
  );

  // Create a new queue
  const queueName = `newqueue${new Date().getTime()}`;
  const queueClient = queueServiceClient.getQueueClient(queueName);
  const createQueueResponse = await queueClient.create();
  console.log(
    `Create queue ${queueName} successfully, service assigned request Id: ${createQueueResponse.requestId}`
  );

  // Delete the queue.
  const deleteQueueResponse = await queueClient.delete();
  console.log(
    `Delete queue successfully, service assigned request Id: ${deleteQueueResponse.requestId}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
