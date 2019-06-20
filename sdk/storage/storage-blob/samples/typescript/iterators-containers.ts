/* 
 Setup: Enter your storage account name and shared key in main()
*/

import { BlobServiceClient, newPipeline, SharedKeyCredential } from "../../src"; // Change to "@azure/storage-blob" in your package

async function main() {
  // Enter your storage account name and shared key
  const account = "";
  const accountKey = "";

  // Use SharedKeyCredential with storage account and account key
  const sharedKeyCredential = new SharedKeyCredential(account, accountKey);

  // Use sharedKeyCredential, tokenCredential or anonymousCredential to create a pipeline
  const pipeline = newPipeline(sharedKeyCredential);

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
}

// An async method returns a Promise object, which is compatible with then().catch() coding style.
main()
  .then(() => {
    console.log("Successfully executed the sample.");
  })
  .catch((err) => {
    console.log(err.message);
  });
