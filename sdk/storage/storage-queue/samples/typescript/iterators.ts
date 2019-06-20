/*
 Setup: Enter your storage account name and shared key in main()
*/

import { QueueServiceClient, newPipeline, SharedKeyCredential } from "../../src"; // Change to "@azure/storage-queue" in your package

async function main() {
  // Enter your storage account name and shared key
  const account = "";
  const accountKey = "";
  // Use SharedKeyCredential with storage account and account key
  const sharedKeyCredential = new SharedKeyCredential(account, accountKey);

  // Use sharedKeyCredential, tokenCredential or anonymousCredential to create a pipeline
  const pipeline = newPipeline(sharedKeyCredential);

  const queueServiceClient = new QueueServiceClient(
    // When using AnonymousCredential, following url should include a valid SAS or support public access
    `https://${account}.queue.core.windows.net`,
    pipeline
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
  for await (const response of queueServiceClient.listQueues().byPage({})) {
    if (response.queueItems) {
      for (const queueItem of response.queueItems) {
        console.log(`Queue ${i++}: ${queueItem.name}`);
        i++;
      }
    }
  }

  // 5. Same as the previous example - passing maxPageSize in the page settings
  i = 1;
  for await (const response of queueServiceClient.listQueues().byPage({ maxPageSize: 20 })) {
    if (response.queueItems) {
      for (const queueItem of response.queueItems) {
        console.log(`Queue ${i++}: ${queueItem.name}`);
        i++;
      }
    }
  }

  // 6. Generator syntax .next()
  i = 1;
  let iterator = queueServiceClient.listQueues().byPage({ maxPageSize: 2 });
  let response = (await iterator.next()).value;
  do {
    if (response.queueItems) {
      for (const queueItem of response.queueItems) {
        console.log(`Queue ${i++}: ${queueItem.name}`);
        i++;
      }
    }
    response = (await iterator.next()).value;
  } while (response);

  // 7. Passing marker as an argument (similar to the previous example)
  i = 1;
  iterator = queueServiceClient.listQueues().byPage({ maxPageSize: 2 });
  response = (await iterator.next()).value;
  // Prints 2 queue names
  if (response.queueItems) {
    for (const queueItem of response.queueItems) {
      console.log(`Queue ${i++}: ${queueItem.name}`);
      i++;
    }
  }
  // Gets next marker
  let marker = response.nextMarker;
  // Passing next marker as continuationToken
  iterator = queueServiceClient.listQueues().byPage({ continuationToken: marker, maxPageSize: 10 });
  response = (await iterator.next()).value;
  // Prints 10 queue names
  if (response.queueItems) {
    for (const queueItem of response.queueItems) {
      console.log(`Queue ${i++}: ${queueItem.name}`);
      i++;
    }
  }
}

// An async method returns a Promise object, which is compatible with then().catch() coding style.
main()
  .then(() => {
    console.log("Successfully executed sample.");
  })
  .catch((err) => {
    console.log(err.message);
  });
