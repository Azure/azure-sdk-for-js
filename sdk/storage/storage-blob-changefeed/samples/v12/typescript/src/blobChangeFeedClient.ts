// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary use `BlobChangeFeedClient` to list changes to a blob
 */

import type { BlobChangeFeedEvent } from "@azure/storage-blob-changefeed";
import { BlobChangeFeedClient } from "@azure/storage-blob-changefeed";
import { DefaultAzureCredential } from "@azure/identity";

// Load the .env file if it exists
import "dotenv/config";

export async function main(): Promise<void> {
  // Enter your storage account name
  const account = process.env.ACCOUNT_NAME || "<account name>";

  const changeFeedClient = new BlobChangeFeedClient(
    `https://${account}.blob.core.windows.net`,
    new DefaultAzureCredential(),
  );

  const start = new Date(Date.UTC(2020, 1, 21, 22, 30, 0)); // will be rounded down to 22:00
  const end = new Date(Date.UTC(2020, 4, 8, 21, 10, 0)); // will be rounded up to 22:00

  const changeFeedEvents: BlobChangeFeedEvent[] = [];
  // You can also provide just a start or end time.
  for await (const event of changeFeedClient.listChanges({ start, end })) {
    changeFeedEvents.push(event);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
