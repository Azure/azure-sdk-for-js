// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary list queues in the account, showing options for paging, resuming paging, etc.
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

  console.log("Queues:");
  for await (const item of queueServiceClient.listQueues()) {
    console.log(`- ${item.name}`);
  }

  // The iterator also supports iteration by page with a configurable (and optional) `maxPageSize`. Here, we use a small
  // `maxPageSize` so that the effect of paging is noticeable with a small number of queues.
  const maxPageSize = 5;
  console.log("Queues (by page):");
  let pageNumber = 1;
  for await (const page of queueServiceClient.listQueues().byPage({ maxPageSize })) {
    console.log(`- Page ${pageNumber++}:`);
    if (page.queueItems) {
      for (const queue of page.queueItems) {
        console.log(`  - ${queue.name}`);
      }
    }
  }

  // The paged iterator also supports resuming from a continuation token. In the following example, we use the
  // continuation token from the first iteration to resume iteration at the second page.

  // Get the continuation token
  console.log("Queues starting from the second page of results:");
  const iter = queueServiceClient.listQueues().byPage({ maxPageSize });
  const result = await iter.next();

  if (result.done) {
    throw new Error("Expected at least one page of results.");
  }

  // The continuation token is an optional property of the page.
  const continuationToken = result.value.continuationToken;

  if (!continuationToken) {
    throw new Error("Expected a continuation token from the service, but one was not returned.");
  }

  const resumed = queueServiceClient.listQueues().byPage({ continuationToken, maxPageSize });
  pageNumber = 2;
  for await (const page of resumed) {
    console.log(`- Page ${pageNumber++}`);
    if (page.queueItems) {
      for (const queue of page.queueItems) {
        console.log(`  - ${queue.name}`);
      }
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
