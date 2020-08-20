import { BlobServiceClient, StorageSharedKeyCredential } from "@azure/storage-blob";
import { BlobChangeFeedClient, BlobChangeFeedEvent } from "../../src";

// Load the .env file if it exists
import * as dotenv from "dotenv";
console.log(dotenv.config());

import { setLogLevel } from "@azure/logger";
setLogLevel("info");

export async function main() {
  // Enter your storage account name and shared key
  const account = process.env.ACCOUNT_NAME || "";
  const accountKey = process.env.ACCOUNT_KEY || "";

  // Use StorageSharedKeyCredential with storage account and account key
  // StorageSharedKeyCredential is only available in Node.js runtime, not in browsers
  const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
  const blobServiceClient = new BlobServiceClient(
    // When using AnonymousCredential, following url should include a valid SAS or support public access
    `https://${account}.blob.core.windows.net`,
    sharedKeyCredential
  );

  const changeFeedClient = new BlobChangeFeedClient(blobServiceClient);
  let changeFeedEvents: BlobChangeFeedEvent[] = [];
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
