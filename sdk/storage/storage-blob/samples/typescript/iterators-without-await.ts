/*
 Setup: Enter your storage account name and shared key in main()
*/

import { BlobServiceClient, StorageSharedKeyCredential, BlobItem } from "../../src"; // Change to "@azure/storage-blob" in your package

async function main() {
  // Enter your storage account name and shared key
  const account = process.env.ACCOUNT_NAME || "";
  const accountKey = process.env.ACCOUNT_KEY || "";

  // Use StorageSharedKeyCredential with storage account and account key
  // StorageSharedKeyCredential is only avaiable in Node.js runtime, not in browsers
  const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);

  const blobServiceClient = new BlobServiceClient(
    `https://${account}.blob.core.windows.net`,
    sharedKeyCredential
  );

  // Create a container
  const containerName = `newcontainer${new Date().getTime()}`;
  const containerClient = blobServiceClient.getContainerClient(containerName);

  const createContainerResponse = await containerClient.create();
  console.log(`Created container ${containerName} successfully`, createContainerResponse.requestId);

  const numberOfBlobs = 7;
  for (let i = 0; i < numberOfBlobs; i++) {
    // Create a blob
    const content = "hello";
    const blobName = "newblob" + new Date().getTime();
    const blobClient = containerClient.getBlobClient(blobName);
    const blockBlobClient = blobClient.getBlockBlobClient();
    const uploadBlobResponse = await blockBlobClient.upload(content, content.length);
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

// An async method returns a Promise object, which is compatible with then().catch() coding style.
main()
  .then(() => {
    console.log("Successfully executed the sample.");
  })
  .catch((err) => {
    console.log(err.message);
  });
