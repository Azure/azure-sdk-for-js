// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary list queues in the account, showing options for paging, resuming paging, etc.
 */

const { DefaultAzureCredential } = require("@azure/identity");
const { QueueServiceClient } = require("@azure/storage-queue");

// Load the .env file if it exists
require("dotenv/config");

async function main() {
  // Enter your storage account name
  const accountName = process.env.ACCOUNT_NAME;

  if (!accountName) {
    throw new Error("ACCOUNT_NAME environment variable is not set.");
  }

  // List queues
  const queueServiceClient = new QueueServiceClient(
    `https://${accountName}.queue.core.windows.net`,
    new DefaultAzureCredential(),
  );

  // Iterate over all queues in the account
  console.log("Queues:");
  for await (const queue of queueServiceClient.listQueues()) {
    console.log(`- ${queue.name}`);
  }

  // The iterator also supports iteration by page with a configurable (and optional) `maxPageSize` setting.
  console.log("Queues (by page):");
  for await (const response of queueServiceClient.listQueues().byPage({
    maxPageSize: 20,
  })) {
    console.log("- Page:");
    if (response.queueItems) {
      for (const queue of response.queueItems) {
        console.log(`  - ${queue.name}`);
      }
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
