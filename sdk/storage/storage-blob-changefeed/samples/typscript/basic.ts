import { BlobServiceClient, StorageSharedKeyCredential } from "@azure/storage-blob";
// import { BlobChangeFeedClient } from "@azure/storage-blob-changefeed";
import { BlobChangeFeedClient } from "../../src";

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


  const containerClient = blobServiceClient.getContainerClient("$blobchangefeed");
  console.log("List container.")
  for await (const item of containerClient.listBlobsFlat()) {
    console.log(`${item.name}: ${item.properties.contentLength}`);
  }

  const changeFeedClient = new BlobChangeFeedClient(blobServiceClient);
  let i = 0;
  for await (const event of changeFeedClient.getChanges()) {
    i++;
    if (i <= 2) {
      console.log(event);
    } else {
      break;
    }
  }
  console.log(`event count: ${i}`);
}

main().catch((err) => {
  console.error("Error running sample:", err.message);
});
