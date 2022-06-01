// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary list blobs by hierarchy, using separators in the blob names, using options for paging, resuming paging, etc.
 * @azsdk-weight 70
 */

import { ContainerClient, StorageSharedKeyCredential } from "@azure/storage-blob";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  // Enter your storage account name and shared key
  const account = process.env.ACCOUNT_NAME || "";
  const accountKey = process.env.ACCOUNT_KEY || "";

  // Use StorageSharedKeyCredential with storage account and account key
  // StorageSharedKeyCredential is only available in Node.js runtime, not in browsers
  const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);

  // Create a container
  const containerName = `newcontainer${new Date().getTime()}`;
  const containerClient = new ContainerClient(
    `https://${account}.blob.core.windows.net/${containerName}`,
    sharedKeyCredential
  );

  const createContainerResponse = await containerClient.create();
  console.log(`Created container ${containerName} successfully`, createContainerResponse.requestId);

  // create some blobs with delimiters in names
  const content = "hello";
  const contentByteLength = Buffer.byteLength(content);

  // Initialize the container with some example data
  for (const blobName of [
    "a1",
    "a2",
    "prefix1/b1",
    "prefix1/b2",
    "prefix2/sub1/c",
    "prefix2/sub1/d",
    "prefix2/sub1/e",
  ]) {
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    const { requestId } = await blockBlobClient.upload(content, contentByteLength);
    console.log(`Uploaded block blob "${blobName}" successfully (ID: ${requestId})`);
  }

  // Listing blobs and prefixes by hierarchy (using a delimiter in the blob name)
  console.log("Listing blobs by hierarchy:");
  for await (const item of containerClient.listBlobsByHierarchy("/")) {
    if (item.kind === "prefix") {
      console.log(`\tBlobPrefix: ${item.name}`);
    } else {
      console.log(
        `\tBlobItem: name - ${item.name}, last modified - ${item.properties.lastModified}`
      );
    }
  }

  // A prefix may also be specified
  console.log("Listing blobs by hierarchy, specifying a prefix:");
  const items = containerClient.listBlobsByHierarchy("/", { prefix: "prefix1/" });
  for await (const item of items) {
    if (item.kind === "prefix") {
      console.log(`\tBlobPrefix: ${item.name}`);
    } else {
      console.log(
        `\tBlobItem: name - ${item.name}, last modified - ${item.properties.lastModified}`
      );
    }
  }

  // The iterator also supports iteration by page, by calling `byPage`. Paging may be combined with the `prefix` option
  // for full control over iteration.
  console.log("Listing blobs by hierarchy, by page:");
  for await (const page of containerClient.listBlobsByHierarchy("/").byPage()) {
    const segment = page.segment;
    if (segment.blobPrefixes) {
      for (const prefix of segment.blobPrefixes) {
        console.log(`\tBlobPrefix: ${prefix.name}`);
      }
    }
    for (const blob of page.segment.blobItems) {
      console.log(
        `\tBlobItem: name - ${blob.name}, last modified - ${blob.properties.lastModified}`
      );
    }
  }

  await containerClient.delete();
  console.log("Deleted container:", containerClient.containerName);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
