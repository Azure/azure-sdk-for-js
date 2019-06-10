/*
 Setup: Enter your storage account name and shared key in main()
*/

import { QueueServiceClient, StorageClient, SharedKeyCredential } from "../../src"; // Change to "@azure/storage-queue" in your package

async function main() {
  // Enter your storage account name and shared key
  const account = "";
  const accountKey = "";
  // Use SharedKeyCredential with storage account and account key
  const sharedKeyCredential = new SharedKeyCredential(account, accountKey);

  // Use sharedKeyCredential, tokenCredential or anonymousCredential to create a pipeline
  const pipeline = StorageClient.newPipeline(sharedKeyCredential);

  const queueServiceClient = new QueueServiceClient(
    // When using AnonymousCredential, following url should include a valid SAS or support public access
    `https://${account}.queue.core.windows.net`,
    pipeline
  );

  console.log(`List queues`);

  // List queues
  let i = 1;
  let marker: string | undefined = undefined;

  let iter1 = queueServiceClient.listQueues();
  for await (const item of iter1) {
    console.log(`Queue${i}: ${item!.name}`);
    i++;
  }

  // Same as the previous example
  i = 1;
  for await (const item of queueServiceClient.listQueues()) {
    console.log(`Queue${i}: ${item!.name}`);
    i++;
  }

  // Generator syntax .next()
  i = 1;
  let iter2 = queueServiceClient.listQueues();
  let item2 = (await iter2.next()).value;
  do {
    console.log(`Queue${i}: ${item2!.name}`);
    i++;
    item2 = (await iter2.next()).value;
  } while (item2);

  ////////////////////////////////
  ///  Examples for .byPage()  ///
  ////////////////////////////////

  i = 1;
  for await (const item1 of queueServiceClient.listQueues().byPage({})) {
    item1.queueItems!.forEach((queueItem) => {
      console.log(`Queue${i}: ${queueItem.name}`);
      i++;
    });
  }

  // Same as the previous example
  i = 1;
  for await (const item2 of queueServiceClient.listQueues().byPage({ pagesize: 20 })) {
    item2.queueItems!.forEach((queueItem) => {
      console.log(`Queue${i}: ${queueItem.name}`);
      i++;
    });
  }

  // Generator syntax .next()
  i = 1;
  let iter3 = queueServiceClient.listQueues().byPage({ pagesize: 2 });
  let item3 = (await iter3.next()).value;
  do {
    for (const queueItem of item3.queueItems!) {
      console.log(`Queue${i}: ${queueItem.name}`);
      i++;
    }
    item3 = (await iter3.next()).value;
  } while (item3);

  // Passing marker as argument (similar to the previous example)
  i = 1;
  let iter4 = queueServiceClient.listQueues().byPage({ pagesize: 2 });
  let item = (await iter4.next()).value;
  // Prints 2 queuenames
  for (const queueItem of item.queueItems!) {
    console.log(`Queue${i}: ${queueItem.name}`);
    i++;
  }
  marker = item.nextMarker;
  iter4 = queueServiceClient.listQueues().byPage({ marker: marker, pagesize: 10 });
  item = (await iter4.next()).value;
  // Prints 10 queuenames
  for (const queueItem of item.queueItems!) {
    console.log(`Queue${i}: ${queueItem.name}`);
    i++;
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
