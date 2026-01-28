// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary resume listing changes using a continuation token
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

  const changeFeedEvents: BlobChangeFeedEvent[] = [];
  const firstPage = await changeFeedClient.listChanges().byPage({ maxPageSize: 10 }).next();
  for (const event of firstPage.value.events) {
    changeFeedEvents.push(event);
  }

  // Resume iterating from the pervious position with the continuationToken.
  for await (const eventPage of changeFeedClient
    .listChanges()
    .byPage({ continuationToken: firstPage.value.continuationToken })) {
    for (const event of eventPage.events) {
      changeFeedEvents.push(event);
    }
  }
}

main().catch((err) => {
  console.error("Error running sample:", err.message);
});
