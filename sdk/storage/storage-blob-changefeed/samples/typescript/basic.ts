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

  const start = new Date(Date.UTC(2020, 1, 21, 22, 30, 0)); // will be rounded down to 22:00
  const end = new Date(Date.UTC(2020, 4, 8, 21, 10, 0)); // will be rounded up to 22:00
  let changeFeedEvents: BlobChangeFeedEvent[] = [];
  // You can also provide just a start or end time.
  for await (const event of changeFeedClient.listChanges({ start, end })) {
    changeFeedEvents.push(event);
  }
}

main().catch((err) => {
  console.error("Error running sample:", err.message);
});
