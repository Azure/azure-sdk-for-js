// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/*
 Setup: Enter your storage account name and shared key in main()
*/

const { ContainerClient, StorageSharedKeyCredential } = require("@azure/storage-blob");

// Load the .env file if it exists
require("dotenv").config();

async function main() {
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

  for (let index = 0; index < 7; index++) {
    // Create a blob
    const content = "hello";
    const blobName = "newblob" + new Date().getTime();
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    const uploadBlobResponse = await blockBlobClient.upload(content, Buffer.byteLength(content));
    console.log(`Uploaded block blob ${blobName} successfully`, uploadBlobResponse.requestId);
  }

  // 1. List blobs
  console.log("Listing all blobs using iter");
  let i = 1;
  let iter = containerClient.listBlobsFlat();
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
  console.log("Listing all blobs by page, using iterator.next() and continuation token");
  i = 1;
  iterator = containerClient.listBlobsFlat().byPage({ maxPageSize: 20 });
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

main().catch((err) => {
  console.error("Error running sample:", err.message);
});
