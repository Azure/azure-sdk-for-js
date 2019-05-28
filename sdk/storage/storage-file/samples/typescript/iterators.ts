/*
 Setup: Enter your storage account name and shared key in main()
*/

import { StorageClient, FileServiceClient, SharedKeyCredential } from "../../src"; // Change to "@azure/storage-file" in your package

async function main() {
  // Enter your storage account name and shared key
  const account = "";
  const accountKey = "";
  // Use SharedKeyCredential with storage account and account key
  // SharedKeyCredential is only avaiable in Node.js runtime, not in browsers
  const sharedKeyCredential = new SharedKeyCredential(account, accountKey);

  // Use sharedKeyCredential or anonymousCredential to create a pipeline
  const pipeline = StorageClient.newPipeline(sharedKeyCredential);

  // List shares
  const serviceClient = new FileServiceClient(
    // When using AnonymousCredential, following url should include a valid SAS
    `https://${account}.file.core.windows.net`,
    pipeline
  );

  console.log(`List shares`);

  // List shares
  let shareIter1 = serviceClient.listShares();
  let i = 1;
  for await (const share of shareIter1) {
    console.log(`Share${i}: ${share.name}`);
    i++;
  }

  // List shares - generator syntax
  let shareIter2 = await serviceClient.listShares();
  i = 1;
  let shareItem = await shareIter2.next();
  do {
    console.log(`Share${i++}: ${shareItem.value.name}`);
    shareItem = await shareIter2.next();
  } while (shareItem.value);

  // Create a share
  const shareName = `newshare${new Date().getTime()}`;
  const shareClient = serviceClient.createShareClient(shareName);
  await shareClient.create();
  console.log(`Create share ${shareName} successfully`);

  // Create a directory
  const directoryName = `newdirectory${new Date().getTime()}`;
  const directoryClient = shareClient.createDirectoryClient(directoryName);
  await directoryClient.create();
  console.log(`Create directory ${directoryName} successfully`);

  // Create a file
  const content = "Hello World!";
  const fileName = "newfile" + new Date().getTime();
  const fileClient = directoryClient.createFileClient(fileName);
  const directoryName2 = `newdirectory${new Date().getTime()}`;
  const directoryClient2 = directoryClient.createDirectoryClient(directoryName2);
  await directoryClient2.create();
  console.log(`Create sub directory ${directoryName2} successfully`);

  await fileClient.create(content.length);
  console.log(`Create file ${fileName} successfully`);

  console.log(`List directories and files under directory ${directoryName}`);

  // List directories and files
  let dirIter1 = directoryClient.listFilesAndDirectories();
  i = 1;
  for await (const item of dirIter1) {
    console.log(`${i}: ${item.name}`);
    i++;
  }

  // List directories and files - generator syntax
  let dirIter2 = await directoryClient.listFilesAndDirectories();
  i = 1;
  let item = await dirIter2.next();
  do {
    console.log(`${i++}: ${item.value.name}`);
    item = await dirIter2.next();
  } while (item.value);

  // Delete share
  await shareClient.delete();
  console.log(`deleted share ${shareName}`);
}

// An async method returns a Promise object, which is compatible with then().catch() coding style.
main()
  .then(() => {
    console.log("Successfully executed sample.");
  })
  .catch((err) => {
    console.log(err.message);
  });
