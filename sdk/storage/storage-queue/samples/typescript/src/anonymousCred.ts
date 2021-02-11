// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/*
 Setup: Enter your storage account name and SAS in main()
*/

import { QueueServiceClient, AnonymousCredential } from "@azure/storage-queue";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

export async function main() {
  // Enter your storage account name and SAS
  const account = process.env.ACCOUNT_NAME || "";
  const accountSas = process.env.ACCOUNT_SAS || "";

  // Use AnonymousCredential when url already includes a SAS signature
  const anonymousCredential = new AnonymousCredential();

  const queueServiceClient = new QueueServiceClient(
    // When using AnonymousCredential, following url should include a valid SAS or support public access
    `https://${account}.queue.core.windows.net${accountSas}`,
    anonymousCredential
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

main().catch((err) => {
  console.error("Error running sample:", err.message);
});
