// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/*
 Setup: Enter your storage account name and shared key in main()
*/

import { ShareServiceClient, StorageSharedKeyCredential } from "@azure/storage-file-share";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

export async function main() {
  // Enter your storage account name, shared key, share name, and directory name.
  // Please ensure your directory is mounted
  //   https://docs.microsoft.com/en-us/azure/storage/files/storage-how-to-use-files-windows
  //   https://docs.microsoft.com/en-us/azure/storage/files/storage-how-to-use-files-linux
  //   https://docs.microsoft.com/en-us/azure/storage/files/storage-how-to-use-files-mac
  const account = process.env.ACCOUNT_NAME || "";
  const accountKey = process.env.ACCOUNT_KEY || "";
  const shareName = process.env.SHARE_NAME || "";
  const dirName = process.env.DIR_NAME || "";

  if (shareName === "" || dirName === "") {
    console.warn(
      "Share/directory information not provided, but it is required to run this sample. Exiting."
    );
    return;
  }

  // Use StorageSharedKeyCredential with storage account and account key
  // StorageSharedKeyCredential is only available in Node.js runtime, not in browsers
  const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);

  const serviceClient = new ShareServiceClient(
    `https://${account}.file.core.windows.net`,
    sharedKeyCredential
  );

  const shareClient = serviceClient.getShareClient(shareName);
  const dirClient = shareClient.getDirectoryClient(dirName);

  console.log(`List handles`);

  // 1. List handles
  let i = 1;
  let iter = dirClient.listHandles();
  for await (const handle of iter) {
    console.log(
      `Handle ${i++}: ${handle.path}, opened time ${handle.openTime}, clientIp ${handle.clientIp}`
    );
  }

  console.log(`List handles directly without using iter`);

  // 2. Same as the previous example
  i = 1;
  for await (const handle of dirClient.listHandles()) {
    console.log(
      `Handle ${i++}: ${handle.path}, opened time ${handle.openTime}, clientIp ${handle.clientIp}`
    );
  }

  console.log(`List handles using iter.next()`);

  // 3. Generator syntax .next()
  i = 1;
  iter = dirClient.listHandles();
  let handleItem = await iter.next();
  while (!handleItem.done) {
    console.log(
      `Handle ${i++}: ${handleItem.value.path}, opened time ${
        handleItem.value.openTime
      }, clientIp ${handleItem.value.clientIp}`
    );
    handleItem = await iter.next();
  }

  ////////////////////////////////////////////////////////
  ///////////////  Examples for .byPage()  ///////////////
  ////////////////////////////////////////////////////////

  console.log(`List handles by pages`);

  // 4. list handles by page
  i = 1;
  for await (const response of dirClient.listHandles().byPage()) {
    if (response.handleList) {
      for (const handle of response.handleList) {
        console.log(
          `Handle ${i++}: ${handle.path}, opened time ${handle.openTime}, clientIp ${
            handle.clientIp
          }`
        );
      }
    }
  }

  console.log(`List handles by pages recursively with max page size`);

  // 5. Same as the previous example - passing maxPageSize in the page settings
  i = 1;
  for await (const response of dirClient
    .listHandles({ recursive: true })
    .byPage({ maxPageSize: 20 })) {
    if (response.handleList) {
      for (const handle of response.handleList) {
        console.log(
          `Handle ${i++}: ${handle.path}, opened time ${handle.openTime}, clientIp ${
            handle.clientIp
          }`
        );
      }
    }
  }

  console.log(`List handles by pages using next()`);

  // 6. Generator syntax .next()
  i = 1;
  let iterator = dirClient.listHandles().byPage({ maxPageSize: 2 });
  let response = await iterator.next();
  while (!response.done) {
    if (response.value.handleList) {
      for (const handle of response.value.handleList) {
        console.log(
          `Handle ${i++}: ${handle.path}, opened time ${handle.openTime}, clientIp ${
            handle.clientIp
          }`
        );
      }
    }
    response = await iterator.next();
  }

  console.log(`List handles by pages with continuation`);

  // 7. Passing marker as an argument (similar to the previous example)
  i = 1;
  iterator = dirClient.listHandles().byPage({ maxPageSize: 2 });
  response = await iterator.next();
  // Prints 2 handles
  if (response.value.handleList) {
    for (const handle of response.value.handleList) {
      console.log(
        `Handle ${i++}: ${handle.path}, opened time ${handle.openTime}, clientIp ${handle.clientIp}`
      );
    }
  }
  // Gets next marker
  let marker = response.value.continuationToken;
  // Passing next marker as continuationToken
  console.log(`    continuation`);
  iterator = dirClient.listHandles().byPage({ continuationToken: marker, maxPageSize: 2 });
  response = await iterator.next();
  // Prints 2 more handles assuming you have more than four handles
  if (!response.done && response.value.handleList) {
    for (const handle of response.value.handleList) {
      console.log(
        `Handle ${i++}: ${handle.path}, opened time ${handle.openTime}, clientIp ${handle.clientIp}`
      );
    }
  }
}

main().catch((err) => {
  console.error("Error running sample:", err.message);
});
