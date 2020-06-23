// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/*
 Setup: Enter your storage account name and shared key in main()
*/

const { BlobServiceClient, StorageSharedKeyCredential } = require("@azure/storage-blob");

// Load the .env file if it exists
require("dotenv").config();

async function main() {
  // Enter your storage account name and shared key
  const account = process.env.ACCOUNT_NAME || "";
  const accountKey = process.env.ACCOUNT_KEY || "";

  // Use StorageSharedKeyCredential with storage account and account key
  // StorageSharedKeyCredential is only available in Node.js runtime, not in browsers
  const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);

  // List containers
  const blobServiceClient = new BlobServiceClient(
    `https://${account}.blob.core.windows.net`,
    sharedKeyCredential
  );

  // 1. List Containers
  console.log("Listing all containers using iter");
  let i = 1;
  let iter = blobServiceClient.listContainers();
  for await (const container of iter) {
    console.log(`Container ${i++}: ${container.name}`);
  }

  // 2. Same as the previous example
  console.log("Listing all containers without iter");
  i = 1;
  for await (const container of blobServiceClient.listContainers()) {
    console.log(`Container ${i++}: ${container.name}`);
  }

  // 3. Generator syntax .next()
  console.log("Listing all containers using iter.next()");
  i = 1;
  iter = blobServiceClient.listContainers();
  let containerItem = await iter.next();
  while (!containerItem.done) {
    console.log(`Container ${i++}: ${containerItem.value.name}`);
    containerItem = await iter.next();
  }

  ////////////////////////////////////////////////////////
  ///////////////  Examples for .byPage()  ///////////////
  ////////////////////////////////////////////////////////

  // 4. list containers by page
  console.log("Listing all containers byPage()");
  i = 1;
  for await (const response of blobServiceClient.listContainers().byPage()) {
    if (response.containerItems) {
      for (const container of response.containerItems) {
        console.log(`Container ${i++}: ${container.name}`);
      }
    }
  }

  // 5. Same as the previous example - passing maxPageSize in the page settings
  console.log("Listing all containers byPage(), passing maxPageSize in the page settings");
  i = 1;
  for await (const response of blobServiceClient.listContainers().byPage({ maxPageSize: 20 })) {
    if (response.containerItems) {
      for (const container of response.containerItems) {
        console.log(`Container ${i++}: ${container.name}`);
      }
    }
  }

  // 6. Generator syntax .next()
  console.log("Listing all containers byPage(), using iterator.next()");
  i = 1;
  let iterator = blobServiceClient.listContainers().byPage({ maxPageSize: 20 });
  let response = await iterator.next();
  while (!response.done) {
    if (response.value.containerItems) {
      for (const container of response.value.containerItems) {
        console.log(`Container ${i++}: ${container.name}`);
      }
    }
    response = await iterator.next();
  }

  // 7. Passing marker as an argument (similar to the previous example)
  console.log("Listing all containers byPage(), using iterator.next() and continuation token");
  i = 1;
  iterator = blobServiceClient.listContainers().byPage({ maxPageSize: 2 });
  response = await iterator.next();
  // Prints 2 container names
  if (response.value.containerItems) {
    for (const container of response.value.containerItems) {
      console.log(`Container ${i++}: ${container.name}`);
    }
  }
  // Gets next marker
  console.log("\tContinuation");
  let marker = response.value.nextMarker;
  // Passing next marker as continuationToken
  iterator = blobServiceClient
    .listContainers()
    .byPage({ continuationToken: marker, maxPageSize: 10 });
  response = await iterator.next();
  // Prints 10 container names
  if (!response.done) {
    for (const container of response.value.containerItems) {
      console.log(`Container ${i++}: ${container.name}`);
    }
  }
}

main().catch((err) => {
  console.error("Error running sample:", err.message);
});
