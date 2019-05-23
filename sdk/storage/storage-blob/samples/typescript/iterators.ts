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
  const account = "";
  const accountKey = "";

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

  // List Containers
  let iter1 = await blobServiceClient.listContainers();
  let i = 1;
  for await (const container of iter1) {
    console.log(`Container ${i++}: ${container.name}`);
  }

  // List containers - generator syntax
  let iter2 = await blobServiceClient.listContainers();
  i = 1;
  let containerItem = await iter2.next();
  do {
    console.log(`Container ${i++}: ${containerItem.value.name}`);
    containerItem = await iter2.next();
  } while (containerItem.value);

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

  // List blobs
  iter1 = await containerClient.listBlobs();
  i = 1;
  for await (const blob of iter1) {
    console.log(`Blob ${i++}: ${blob.name}`);
  }

  // List blobs - generator syntax
  iter2 = await containerClient.listBlobs();
  i = 1;
  let blobItem = await iter2.next();
  do {
    console.log(`Blob ${i++}: ${blobItem.value.name}`);
    blobItem = await iter2.next();
  } while (blobItem.value);
}

// An async method returns a Promise object, which is compatible with then().catch() coding style.
main()
  .then(() => {
    console.log("Successfully executed the sample.");
  })
  .catch((err) => {
    console.log(err.message);
  });
