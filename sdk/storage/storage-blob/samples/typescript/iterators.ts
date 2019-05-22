/* 
 Setup: Enter your storage account name and shared key in main()
*/

import {
  ContainerClient,
  BlobServiceClient,
  StorageClient,
  SharedKeyCredential,
  BlobClient,
  BlockBlobClient
} from "../../src"; // Change to "@azure/storage-blob" in your package

async function main() {
  // Enter your storage account name and shared key
  const account = process.env["ACCOUNT_NAME"] || "";
  const accountKey = process.env["ACCOUNT_KEY"] || "";

  // Use SharedKeyCredential with storage account and account key
  const sharedKeyCredential = new SharedKeyCredential(account, accountKey);

  // Use sharedKeyCredential, tokenCredential or anonymousCredential to create a pipeline
  const pipeline = StorageClient.newPipeline(sharedKeyCredential);

  // List containers
  const blobServiceClient = new BlobServiceClient(
    // When using AnonymousCredential, following url should include a valid SAS or support public access
    `https://${account}.blob.core.windows.net`,
    pipeline
  );

  // Create a container
  const containerName = `newcontainer${new Date().getTime()}`;
  const containerClient = ContainerClient.fromBlobServiceClient(blobServiceClient, containerName);

  const createContainerResponse = await containerClient.create();
  console.log(`Created container ${containerName} successfully`, createContainerResponse.requestId);

  for (let index = 0; index < 4; index++) {
    // Create a blob
    let content = "hello";
    let blobName = "newblob" + new Date().getTime();
    let blobClient = BlobClient.fromContainerClient(containerClient, blobName);
    let blockBlobClient = BlockBlobClient.fromBlobClient(blobClient);
    let uploadBlobResponse = await blockBlobClient.upload(content, content.length);
    console.log(`Uploaded block blob ${blobName} successfully`, uploadBlobResponse.requestId);
  }

  let iter1 = await containerClient.listBlobs();
  let i = 1;
  for await (const blob of iter1) {
    console.log(`blob ${i}: ${blob.name}`);
    i++;
  }
}

// An async method returns a Promise object, which is compatible with then().catch() coding style.
main()
  .then(() => {
    console.log("Successfully executed the sample.");
  })
  .catch((err) => {
    console.log(err.message);
  });
