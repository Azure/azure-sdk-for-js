/*
 Setup: Enter your storage account name and shared key in main()
*/

import { newPipeline, FileServiceClient, SharedKeyCredential } from "../../src"; // Change to "@azure/storage-file" in your package

async function main() {
  // Enter your storage account name and shared key
  const account = "";
  const accountKey = "";
  // Use SharedKeyCredential with storage account and account key
  // SharedKeyCredential is only avaiable in Node.js runtime, not in browsers
  const sharedKeyCredential = new SharedKeyCredential(account, accountKey);

  // Use sharedKeyCredential or anonymousCredential to create a pipeline
  const pipeline = newPipeline(sharedKeyCredential);

  // List shares
  const serviceClient = new FileServiceClient(
    // When using AnonymousCredential, following url should include a valid SAS
    `https://${account}.file.core.windows.net`,
    pipeline
  );

  console.log(`List shares`);

  ////////////////////////////////////////////////////////
  ///////////////////  List Shares  //////////////////////
  ////////////////////////////////////////////////////////

  let i = 1;

  let shareIter1 = serviceClient.listShares();
  for await (const share of shareIter1) {
    console.log(`Share${i}: ${share.name}`);
    const shareClient = serviceClient.createShareClient(share.name);
    await shareClient.delete();
    i++;
    if (i > 3400) {
      break;
    }
  }

  // Same as the previous example
  i = 1;
  for await (const item of serviceClient.listShares()) {
    console.log(`Share${i}: ${item.name}`);
    i++;
  }

  // Generator syntax .next()
  let shareIter2 = await serviceClient.listShares();
  i = 1;
  let shareItem = await shareIter2.next();
  while (!shareItem.done) {
    console.log(`Share${i}: ${shareItem.value.name}`);
    i++;
    shareItem = await shareIter2.next();
  }

  ///////////////  Examples for .byPage()  ///////////////

  i = 1;
  for await (const item1 of serviceClient.listShares().byPage()) {
    if (item1.shareItems) {
      for (const queueItem of item1.shareItems) {
        console.log(`Share${i}: ${queueItem.name}`);
        i++;
      }
    }
  }

  // Same as the previous example - passing maxPageSize in the page settings
  i = 1;
  for await (const item2 of serviceClient.listShares().byPage({ maxPageSize: 20 })) {
    if (item2.shareItems) {
      for (const queueItem of item2.shareItems) {
        console.log(`Share${i}: ${queueItem.name}`);
        i++;
      }
    }
  }

  // Generator syntax .next()
  i = 1;
  let iter3 = serviceClient.listShares().byPage({ maxPageSize: 2 });
  let item3 = (await iter3.next()).value;
  do {
    if (item3.shareItems) {
      for (const queueItem of item3.shareItems) {
        console.log(`Share${i}: ${queueItem.name}`);
        i++;
      }
    }
    item3 = (await iter3.next()).value;
  } while (item3);

  // Passing marker as an argument (similar to the previous example)
  i = 1;
  let iter4 = serviceClient.listShares().byPage({ maxPageSize: 2 });
  let shareItem2 = (await iter4.next()).value;
  // Prints 2 queue names
  if (shareItem2.shareItems) {
    for (const queueItem of shareItem2.shareItems) {
      console.log(`Queue${i}: ${queueItem.name}`);
      i++;
    }
  }
  // Gets next marker
  let marker = shareItem2.nextMarker;
  // Passing next marker as continuationToken
  iter4 = serviceClient.listShares().byPage({ continuationToken: marker, maxPageSize: 10 });
  shareItem2 = (await iter4.next()).value;
  // Prints 10 queue names
  if (shareItem2.shareItems) {
    for (const queueItem of shareItem2.shareItems) {
      console.log(`Queue${i}: ${queueItem.name}`);
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
