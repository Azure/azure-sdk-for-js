// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary list files and directories in a share, showing options for paging, resuming paging, etc.
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
  console.log(`Created share ${shareName} successfully.`);

  // Create a directory
  const directoryName = `newdirectory${new Date().getTime()}`;
  const directoryClient = shareClient.getDirectoryClient(directoryName);
  await directoryClient.create();
  console.log(`Created directory ${directoryName} successfully.`);

  const content = "Hello World!";
  const fileName = "newfile" + new Date().getTime();

  // Creates 3 files and 3 directories in the above directory
  for (let i = 0; i < 3; i++) {
    const directoryClient2 = directoryClient.getDirectoryClient(directoryName + "-sub-" + i);
    await directoryClient2.create();
    console.log(`Created sub directory ${directoryClient.name} successfully.`);

    const fileClient = directoryClient.getFileClient(fileName + "-sub-" + i);
    await fileClient.create(Buffer.byteLength(content));
    console.log(`Created file ${fileClient.name} successfully.`);
  }

  console.log(`Files in ${directoryClient.name}:`);
  for await (const entity of directoryClient.listFilesAndDirectories()) {
    console.log(`- ${entity.name} (${entity.kind})`);
  }

  // The iterator also supports iteration by page with a configurable (and optional) `maxPageSize`. Here, we use a small
  // `maxPageSize` so that the effect of paging is noticeable with our small number of example files.

  const maxPageSize = 2;
  console.log(`Files in ${directoryClient.name} (by page):`);
  let pageNumber = 1;
  for await (const page of directoryClient.listFilesAndDirectories().byPage({ maxPageSize })) {
    console.log(`- Page ${pageNumber++}`);

    // In iteration by page, file entities are listed separately from directory entities.
    for (const file of page.segment.fileItems) {
      console.log(`  - ${file.name} (file)`);
    }

    for (const directory of page.segment.directoryItems) {
      console.log(`  - ${directory.name} (directory)`);
    }
  }

  // The paged iterator also supports resuming from a continuation token. In the following example, we use the
  // continuation token from the first iteration to resume iteration at the second page.

  console.log(`Files in ${directoryClient.name} (by page, starting from the second page):`);
  const iter = directoryClient.listFilesAndDirectories().byPage({ maxPageSize });
  const result = await iter.next();

  if (result.done) {
    throw new Error("Expected at least one page of results.");
  }

  // The continuation token is an optional property of the page.
  const continuationToken = result.value.continuationToken;

  if (!continuationToken) {
    throw new Error("Expected a continuation token from the service, but one was not returned.");
  }

  pageNumber = 2;
  const resumed = directoryClient
    .listFilesAndDirectories()
    .byPage({ maxPageSize, continuationToken });

  for await (const page of resumed) {
    console.log(`- Page ${pageNumber++}`);

    // In iteration by page, file entities are listed separately from directory entities.
    for (const file of page.segment.fileItems) {
      console.log(`  - ${file.name} (file)`);
    }

    for (const directory of page.segment.directoryItems) {
      console.log(`  - ${directory.name} (directory)`);
    }
  }

  // Finally, delete the share
  await shareClient.delete();
  console.log(`Deleted share ${shareClient.name}.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

module.exports = { main };
