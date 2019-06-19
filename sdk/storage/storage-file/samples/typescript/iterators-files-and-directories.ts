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

  const content = "Hello World!";
  const fileName = "newfile" + new Date().getTime();

  // Creates 3 files and 3 directories in the above directory
  for (let i = 0; i < 3; i++) {
    const directoryClient2 = directoryClient.createDirectoryClient(directoryName + "-sub-" + i);
    await directoryClient2.create();
    console.log(`Create sub directory ${directoryName + "-sub-" + i} successfully`);

    const fileClient = directoryClient.createFileClient(fileName + "-sub-" + i);
    await fileClient.create(content.length);
    console.log(`Create file ${fileName + "-sub-" + i} successfully`);
  }

  console.log(`List files and directories under directory ${directoryName}`);

  ////////////////////////////////////////////////////////
  /////////////  List files and directories  /////////////
  ////////////////////////////////////////////////////////

  let i = 1;

  let dirIter1 = directoryClient.listFilesAndDirectories();
  for await (const item of dirIter1) {
    if (item.kind === "directory") {
      console.log(`${i} - directory\t: ${item.name}`);
    } else {
      console.log(`${i} - file\t: ${item.name}`);
    }
    i++;
  }

  // Same as the previous example
  i = 1;
  for await (const item of directoryClient.listFilesAndDirectories()) {
    if (item.kind === "directory") {
      console.log(`${i} - directory\t: ${item.name}`);
    } else {
      console.log(`${i} - file\t: ${item.name}`);
    }
    i++;
  }

  // Generator syntax .next()
  let dirIter2 = await directoryClient.listFilesAndDirectories();
  i = 1;
  let item = await dirIter2.next();
  while (!item.done) {
    if (item.value.kind === "directory") {
      console.log(`${i} - directory\t: ${item.value.name}`);
    } else {
      console.log(`${i} - file\t: ${item.value.name}`);
    }
    item = await dirIter2.next();
    i++;
  }

  ///////////////  Examples for .byPage()  ///////////////

  i = 1;
  for await (const item1 of directoryClient.listFilesAndDirectories().byPage()) {
    for (const fileItem of item1.segment.fileItems) {
      console.log(`${i} - file\t: ${fileItem.name}`);
      i++;
    }
    for (const dirItem of item1.segment.directoryItems) {
      console.log(`${i} - directory\t: ${dirItem.name}`);
      i++;
    }
  }

  // Same as the previous example - passing maxPageSize in the page settings
  i = 1;
  for await (const item2 of directoryClient.listFilesAndDirectories().byPage({ maxPageSize: 20 })) {
    for (const fileItem of item2.segment.fileItems) {
      console.log(`${i} - file\t: ${fileItem.name}`);
      i++;
    }
    for (const dirItem of item2.segment.directoryItems) {
      console.log(`${i} - directory\t: ${dirItem.name}`);
      i++;
    }
  }

  // Generator syntax .next()
  i = 1;
  let dirIter3 = directoryClient.listFilesAndDirectories().byPage({ maxPageSize: 2 });
  let item4 = (await dirIter3.next()).value;
  do {
    for (const fileItem of item4.segment.fileItems) {
      console.log(`${i} - file\t: ${fileItem.name}`);
      i++;
    }
    for (const dirItem of item4.segment.directoryItems) {
      console.log(`${i} - directory\t: ${dirItem.name}`);
      i++;
    }
    item4 = (await dirIter3.next()).value;
  } while (item4);

  // Passing marker as an argument (similar to the previous example)
  i = 1;
  let dirIter4 = directoryClient.listFilesAndDirectories().byPage({ maxPageSize: 3 });
  let item5 = (await dirIter4.next()).value;
  // Prints 3 file and directory names
  for (const fileItem of item5.segment.fileItems) {
    console.log(`${i} - file\t: ${fileItem.name}`);
    i++;
  }
  for (const dirItem of item5.segment.directoryItems) {
    console.log(`${i} - directory\t: ${dirItem.name}`);
    i++;
  }
  // Gets next marker
  let dirMarker = item5.nextMarker;
  // Passing next marker as continuationToken
  dirIter4 = directoryClient
    .listFilesAndDirectories()
    .byPage({ continuationToken: dirMarker, maxPageSize: 4 });
  item5 = (await dirIter4.next()).value;
  // Prints 10 file and directory names
  for (const fileItem of item5.segment.fileItems) {
    console.log(`${i} - file\t: ${fileItem.name}`);
    i++;
  }
  for (const dirItem of item5.segment.directoryItems) {
    console.log(`${i} - directory\t: ${dirItem.name}`);
    i++;
  }

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
