/*
 Setup: Enter your storage account name and shared key in main()
*/

import { BlobServiceClient, SharedKeyCredential } from "../../src"; // Change to "@azure/storage-blob" in your package

async function main() {
  // Enter your storage account name and shared key
  const account = "";
  const accountKey = "";

  // Use SharedKeyCredential with storage account and account key
  // SharedKeyCredential is only avaiable in Node.js runtime, not in browsers
  const sharedKeyCredential = new SharedKeyCredential(account, accountKey);

  const blobServiceClient = new BlobServiceClient(
    `https://${account}.blob.core.windows.net`,
    sharedKeyCredential
  );

  // Create a container
  const containerName = `newcontainer${new Date().getTime()}`;
  const containerClient = blobServiceClient.getContainerClient(containerName);

  const createContainerResponse = await containerClient.create();
  console.log(`Created container ${containerName} successfully`, createContainerResponse.requestId);

  for (let index = 0; index < 7; index++) {
    // Create a blob
    const content = "hello";
    const blobName = "newblob" + new Date().getTime();
    const blobClient = containerClient.getBlobClient(blobName);
    const blockBlobClient = blobClient.getBlockBlobClient();
    const uploadBlobResponse = await blockBlobClient.upload(content, content.length);
    console.log(`Uploaded block blob ${blobName} successfully`, uploadBlobResponse.requestId);
  }

  // 1. List blobs
  console.log("Listing all blobs using iter");
  let i = 1;
  let iter = await containerClient.listBlobsFlat();
  for await (const blob of iter) {
    console.log(`Blob ${i++}: ${blob.name}`);
  }

  // 2. Same as the previous example
  console.log("Listing all blobs");
  i = 1;
  for await (const blob of containerClient.listBlobsFlat()) {
    console.log(`Blob ${i++}: ${blob.name}`);
  }

  // 3. Generator syntax .next()
  console.log("Listing all blobs using iter.next()");
  i = 1;
  iter = containerClient.listBlobsFlat();
  let blobItem = await iter.next();
  while (!blobItem.done) {
    console.log(`Blob ${i++}: ${blobItem.value.name}`);
    blobItem = await iter.next();
  }

  ////////////////////////////////////////////////////////
  ///////////////  Examples for .byPage()  ///////////////
  ////////////////////////////////////////////////////////

  // 4. list containers by page
  console.log("Listing all blobs by page");
  i = 1;
  for await (const response of containerClient.listBlobsFlat().byPage()) {
    for (const blob of response.segment.blobItems) {
      console.log(`Blob ${i++}: ${blob.name}`);
    }
  }

  // 5. Same as the previous example - passing maxPageSize in the page settings
  console.log("Listing all blobs by page, passing maxPageSize in the page settings");
  i = 1;
  for await (const response of containerClient.listBlobsFlat().byPage({ maxPageSize: 20 })) {
    for (const blob of response.segment.blobItems) {
      console.log(`Blob ${i++}: ${blob.name}`);
    }
  }

  // 6. Generator syntax .next()
  console.log("Listing all blobs by page using iterator.next()");
  i = 1;
  let iterator = containerClient.listBlobsFlat().byPage({ maxPageSize: 20 });
  let response = await iterator.next();
  while (!response.done) {
    const segment = response.value.segment;
    for (const blob of segment.blobItems) {
      console.log(`Blob ${i++}: ${blob.name}`);
    }
    response = await iterator.next();
  }

  // 7. Passing marker as an argument (similar to the previous example)
  console.log("Listing all blobs by page, using iteartor.next() and continuation token");
  i = 1;
  iterator = containerClient.listBlobsFlat().byPage({ maxPageSize: 2 });
  response = await iterator.next();
  let segment = response.value.segment;
  // Prints 2 blob names
  for (const blob of segment.blobItems) {
    console.log(`Blob ${i++}: ${blob.name}`);
  }
  // Gets next marker
  console.log("\tContinuation");
  let marker = response.value.nextMarker;
  // Passing next marker as continuationToken
  iterator = containerClient.listBlobsFlat().byPage({ continuationToken: marker, maxPageSize: 10 });
  response = await iterator.next();
  // Prints 5 blob names
  if (!response.done) {
    for (const blob of response.value.segment.blobItems) {
      console.log(`Blob ${i++}: ${blob.name}`);
    }
  }

  await containerClient.delete();
  console.log("deleted container");
}

// An async method returns a Promise object, which is compatible with then().catch() coding style.
main()
  .then(() => {
    console.log("Successfully executed the sample.");
  })
  .catch((err) => {
    console.log(err.message);
  });
