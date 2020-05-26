/*
 Setup: Enter your storage account name and shared key in main()
*/

import { ContainerClient, StorageSharedKeyCredential, BlobItem } from "@azure/storage-blob";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

export async function main() {
  // Enter your storage account name and shared key
  const account = process.env.ACCOUNT_NAME || "";
  const accountKey = process.env.ACCOUNT_KEY || "";

  // Use StorageSharedKeyCredential with storage account and account key
  // StorageSharedKeyCredential is only available in Node.js runtime, not in browsers
  const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);

  // Create a container
  const containerName = `newcontainer${new Date().getTime()}`;
  const containerClient = new ContainerClient(
    `https://${account}.blob.core.windows.net/${containerName}`,
    sharedKeyCredential
  );

  const createContainerResponse = await containerClient.create();
  console.log(`Created container ${containerName} successfully`, createContainerResponse.requestId);

  const numberOfBlobs = 7;
  for (let i = 0; i < numberOfBlobs; i++) {
    // Create a blob
    const content = "hello";
    const blobName = "newblob" + new Date().getTime();
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    const uploadBlobResponse = await blockBlobClient.upload(content, Buffer.byteLength(content));
    console.log(`Uploaded block blob ${blobName} successfully`, uploadBlobResponse.requestId);
  }

  console.log("Listing all blobs without await");
  let index = 1;
  let asyncIter = containerClient.listBlobsFlat();

  function printBlob(result: { done?: boolean; value: BlobItem }) {
    if (!result.done) {
      console.log("Blob " + index++ + ": " + result.value.name);
      asyncIter.next().then(printBlob);
    } else {
      containerClient.delete().then(() => console.log("deleted container"));
    }
  }

  asyncIter.next().then(printBlob);
}

main().catch((err) => {
  console.log(err.message);
});
