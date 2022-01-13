// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary resume listing changes using a continuation token
 */

const { StorageSharedKeyCredential } = require("@azure/storage-blob");
const { BlobChangeFeedClient } = require("@azure/storage-blob-changefeed");

// Load the .env file if it exists
require("dotenv").config();

async function main() {
  // Enter your storage account name and shared key
  const account = process.env.ACCOUNT_NAME || "";
  const accountKey = process.env.ACCOUNT_KEY || "";

  // Use StorageSharedKeyCredential with storage account and account key
  // StorageSharedKeyCredential is only available in Node.js runtime, not in browsers
  const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
  const changeFeedClient = new BlobChangeFeedClient(
    // When using AnonymousCredential, following url should include a valid SAS or support public access
    `https://${account}.blob.core.windows.net`,
    sharedKeyCredential
  );

  const changeFeedEvents = [];
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

module.exports = { main };
