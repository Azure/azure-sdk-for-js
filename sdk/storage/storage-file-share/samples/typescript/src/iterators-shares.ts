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
  // Enter your storage account name and shared key
  const account = process.env.ACCOUNT_NAME || "";
  const accountKey = process.env.ACCOUNT_KEY || "";

  // Use StorageSharedKeyCredential with storage account and account key
  // StorageSharedKeyCredential is only available in Node.js runtime, not in browsers
  const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);

  const serviceClient = new ShareServiceClient(
    `https://${account}.file.core.windows.net`,
    sharedKeyCredential
  );

  console.log(`List shares`);

  // 1. List shares
  let i = 1;
  let iter = serviceClient.listShares();
  for await (const share of iter) {
    console.log(`Share ${i++}: ${share.name}`);
  }

  // 2. Same as the previous example
  i = 1;
  for await (const share of serviceClient.listShares()) {
    console.log(`Share ${i++}: ${share.name}`);
  }

  // 3. Generator syntax .next()
  i = 1;
  iter = serviceClient.listShares();
  let shareItem = await iter.next();
  while (!shareItem.done) {
    console.log(`Share ${i++}: ${shareItem.value.name}`);
    shareItem = await iter.next();
  }

  ////////////////////////////////////////////////////////
  ///////////////  Examples for .byPage()  ///////////////
  ////////////////////////////////////////////////////////

  // 4. list shares by page
  i = 1;
  for await (const response of serviceClient.listShares().byPage()) {
    if (response.shareItems) {
      for (const share of response.shareItems) {
        console.log(`Share ${i++}: ${share.name}`);
      }
    }
  }

  // 5. Same as the previous example - passing maxPageSize in the page settings
  i = 1;
  for await (const response of serviceClient.listShares().byPage({ maxPageSize: 20 })) {
    if (response.shareItems) {
      for (const share of response.shareItems) {
        console.log(`Share ${i++}: ${share.name}`);
      }
    }
  }

  // 6. Generator syntax .next()
  i = 1;
  let iterator = serviceClient.listShares().byPage({ maxPageSize: 2 });
  let response = await iterator.next();
  while (!response.done) {
    if (response.value.shareItems) {
      for (const share of response.value.shareItems) {
        console.log(`Share ${i++}: ${share.name}`);
      }
    }
    response = await iterator.next();
  }

  // 7. Passing marker as an argument (similar to the previous example)
  i = 1;
  iterator = serviceClient.listShares().byPage({ maxPageSize: 2 });
  response = await iterator.next();
  // Prints 2 share names
  if (response.value.shareItems) {
    for (const share of response.value.shareItems) {
      console.log(`Share ${i++}: ${share.name}`);
    }
  }
  // Gets next marker
  let marker = response.value.continuationToken;
  // Passing next marker as continuationToken
  iterator = serviceClient.listShares().byPage({ continuationToken: marker, maxPageSize: 10 });
  response = await iterator.next();
  // Prints 10 share names
  if (response.value.shareItems) {
    for (const share of response.value.shareItems) {
      console.log(`Share ${i++}: ${share.name}`);
    }
  }
}

main().catch((err) => {
  console.error("Error running sample:", err.message);
});
