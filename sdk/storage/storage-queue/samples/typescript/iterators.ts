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

  // List queues
  let iter1 = queueServiceClient.listQueues();
  let i = 1;
  for await (const item of iter1) {
    console.log(`Queue${i}: ${item.name}`);
    i++;
  }

  // List queues - generator syntax
  let iter2 = await queueServiceClient.listQueues();
  i = 1;
  let item = await iter2.next();
  do {
    console.log(`Queue${i++}: ${item.value.name}`);
    item = await iter2.next();
  } while (item.value);
}

// An async method returns a Promise object, which is compatible with then().catch() coding style.
main()
  .then(() => {
    console.log("Successfully executed sample.");
  })
  .catch((err) => {
    console.log(err.message);
  });
