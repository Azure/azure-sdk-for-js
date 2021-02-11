// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/*
 Setup: Enter your storage account name and shared key in main()
*/

const { ShareServiceClient, StorageSharedKeyCredential } = require("@azure/storage-file-share");

// Load the .env file if it exists
require("dotenv").config();

async function main() {
  // Enter your storage account name and shared key
  const account = process.env.ACCOUNT_NAME || "";
  const accountKey = process.env.ACCOUNT_KEY || "";

  // Use StorageSharedKeyCredential with storage account and account key
  // StorageSharedKeyCredential is only available in Node.js runtime, not in browsers
  const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);

  const serviceClient = new ShareServiceClient(
    // When using AnonymousCredential, following url should include a valid SAS
    `https://${account}.file.core.windows.net`,
    sharedKeyCredential
  );

  // Create a share
  const shareName = `newshare${new Date().getTime()}`;
  const shareClient = serviceClient.getShareClient(shareName);
  await shareClient.create();
  console.log(`Create share ${shareName} successfully`);

  // Create a directory
  const directoryName = `newdirectory${new Date().getTime()}`;
  const directoryClient = shareClient.getDirectoryClient(directoryName);
  await directoryClient.create();
  console.log(`Create directory ${directoryName} successfully`);

  const content = "Hello World!";
  const fileName = "newfile" + new Date().getTime();

  // Creates 3 files and 3 directories in the above directory
  for (let i = 0; i < 3; i++) {
    const directoryClient2 = directoryClient.getDirectoryClient(directoryName + "-sub-" + i);
    await directoryClient2.create();
    console.log(`Create sub directory ${directoryName + "-sub-" + i} successfully`);

    const fileClient = directoryClient.getFileClient(fileName + "-sub-" + i);
    await fileClient.create(Buffer.byteLength(content));
    console.log(`Create file ${fileName + "-sub-" + i} successfully`);
  }

  console.log(`List files and directories under directory ${directoryName}`);

  // 1. List files and directories
  let i = 1;
  let iter = directoryClient.listFilesAndDirectories();
  for await (const entity of iter) {
    if (entity.kind === "directory") {
      console.log(`${i++} - directory\t: ${entity.name}`);
    } else {
      console.log(`${i++} - file\t: ${entity.name}`);
    }
  }

  // 2. Same as the previous example
  i = 1;
  for await (const entity of directoryClient.listFilesAndDirectories()) {
    if (entity.kind === "directory") {
      console.log(`${i++} - directory\t: ${entity.name}`);
    } else {
      console.log(`${i++} - file\t: ${entity.name}`);
    }
  }

  // 3. Generator syntax .next()
  i = 1;
  iter = directoryClient.listFilesAndDirectories();
  let entity = await iter.next();
  while (!entity.done) {
    if (entity.value.kind === "directory") {
      console.log(`${i++} - directory\t: ${entity.value.name}`);
    } else {
      console.log(`${i++} - file\t: ${entity.value.name}`);
    }
    entity = await iter.next();
  }

  ////////////////////////////////////////////////////////
  ///////////////  Examples for .byPage()  ///////////////
  ////////////////////////////////////////////////////////

  // 4. list files and directories by page
  i = 1;
  for await (const response of directoryClient.listFilesAndDirectories().byPage()) {
    for (const fileItem of response.segment.fileItems) {
      console.log(`${i++} - file\t: ${fileItem.name}`);
    }
    for (const dirItem of response.segment.directoryItems) {
      console.log(`${i++} - directory\t: ${dirItem.name}`);
    }
  }

  // 5. Same as the previous example - passing maxPageSize in the page settings
  i = 1;
  for await (const response of directoryClient
    .listFilesAndDirectories()
    .byPage({ maxPageSize: 20 })) {
    for (const fileItem of response.segment.fileItems) {
      console.log(`${i++} - file\t: ${fileItem.name}`);
    }
    for (const dirItem of response.segment.directoryItems) {
      console.log(`${i++} - directory\t: ${dirItem.name}`);
    }
  }

  // 6. Generator syntax .next()
  i = 1;
  let iterator = directoryClient.listFilesAndDirectories().byPage({ maxPageSize: 2 });
  let response = await iterator.next();
  while (!response.done) {
    const segment = response.value.segment;
    for (const fileItem of segment.fileItems) {
      console.log(`${i++} - file\t: ${fileItem.name}`);
    }
    for (const dirItem of segment.directoryItems) {
      console.log(`${i++} - directory\t: ${dirItem.name}`);
    }
    response = await iterator.next();
  }

  // 7. Passing marker as an argument (similar to the previous example)
  i = 1;
  iterator = directoryClient.listFilesAndDirectories().byPage({ maxPageSize: 3 });
  response = await iterator.next();
  // Prints 3 file and directory names
  let segment = response.value.segment;
  for (const fileItem of segment.fileItems) {
    console.log(`${i++} - file\t: ${fileItem.name}`);
  }
  for (const dirItem of segment.directoryItems) {
    console.log(`${i++} - directory\t: ${dirItem.name}`);
  }
  // Gets next marker
  let dirMarker = response.value.continuationToken;
  // Passing next marker as continuationToken
  iterator = directoryClient
    .listFilesAndDirectories()
    .byPage({ continuationToken: dirMarker, maxPageSize: 4 });
  response = await iterator.next();
  segment = response.value.segment;
  // Prints 10 file and directory names
  for (const fileItem of segment.fileItems) {
    console.log(`${i++} - file\t: ${fileItem.name}`);
  }
  for (const dirItem of segment.directoryItems) {
    console.log(`${i++} - directory\t: ${dirItem.name}`);
  }

  // Delete share
  await shareClient.delete();
  console.log(`deleted share ${shareName}`);
}

main().catch((err) => {
  console.error("Error running sample:", err.message);
});
