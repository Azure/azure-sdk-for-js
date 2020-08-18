// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/*
 Setup: Enter your storage account name and shared key in main()
*/

const { QueueServiceClient, StorageSharedKeyCredential } = require("@azure/storage-queue");

// Load the .env file if it exists
require("dotenv").config();

async function main() {
  // Enter your storage account name and shared key
  const account = process.env.ACCOUNT_NAME || "";
  const accountKey = process.env.ACCOUNT_KEY || "";

  // Use StorageSharedKeyCredential with storage account and account key
  // StorageSharedKeyCredential is only available in Node.js runtime, not in browsers
  const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);

  const queueServiceClient = new QueueServiceClient(
    `https://${account}.queue.core.windows.net`,
    sharedKeyCredential
  );

  console.log(`List queues`);

  // 1. List queues
  let i = 1;
  let iter = queueServiceClient.listQueues();
  for await (const item of iter) {
    console.log(`Queue ${i++}: ${item.name}`);
  }

  // 2. Same as the previous example
  i = 1;
  for await (const item of queueServiceClient.listQueues()) {
    console.log(`Queue ${i++}: ${item.name}`);
  }

  // 3. Generator syntax .next()
  i = 1;
  iter = queueServiceClient.listQueues();
  let queueItem = await iter.next();
  while (!queueItem.done) {
    console.log(`Queue ${i++}: ${queueItem.value.name}`);
    queueItem = await iter.next();
  }

  ////////////////////////////////////////////////////////
  ///////////////  Examples for .byPage()  ///////////////
  ////////////////////////////////////////////////////////

  // 4. list queues by page
  i = 1;
  for await (const response of queueServiceClient.listQueues().byPage()) {
    if (response.queueItems) {
      for (const queueItem of response.queueItems) {
        console.log(`Queue ${i++}: ${queueItem.name}`);
      }
    }
  }

  // 5. Same as the previous example - passing maxPageSize in the page settings
  i = 1;
  for await (const response of queueServiceClient.listQueues().byPage({ maxPageSize: 20 })) {
    if (response.queueItems) {
      for (const queueItem of response.queueItems) {
        console.log(`Queue ${i++}: ${queueItem.name}`);
      }
    }
  }

  // 6. Generator syntax .next()
  i = 1;
  let iterator = queueServiceClient.listQueues().byPage({ maxPageSize: 2 });
  let response = await iterator.next();
  while (!response.done) {
    if (response.value.queueItems) {
      for (const queueItem of response.value.queueItems) {
        console.log(`Queue ${i++}: ${queueItem.name}`);
      }
    }
    response = await iterator.next();
  }

  // 7. Passing marker as an argument (similar to the previous example)
  i = 1;
  iterator = queueServiceClient.listQueues().byPage({ maxPageSize: 2 });
  response = await iterator.next();
  // Prints 2 queue names
  if (response.value.queueItems) {
    for (const queueItem of response.value.queueItems) {
      console.log(`Queue ${i++}: ${queueItem.name}`);
    }
  }
  // Gets next marker
  let marker = response.value.continuationToken;
  if (marker) {
    // Passing next marker as continuationToken
    iterator = queueServiceClient
      .listQueues()
      .byPage({ continuationToken: marker, maxPageSize: 10 });
    response = await iterator.next();
    // Prints 10 queue names
    if (response.value.queueItems) {
      for (const queueItem of response.value.queueItems) {
        console.log(`Queue ${i++}: ${queueItem.name}`);
      }
    }
  }
}

main().catch((err) => {
  console.error("Error running sample:", err.message);
});
