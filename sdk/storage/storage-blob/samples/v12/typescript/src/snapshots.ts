// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * If you use BlobClient.download() to download an append-blob which is being actively appended, you may get an HTTP 412
 * (Precondition Failed) error (see the following issue: https://github.com/Azure/azure-storage-js/issues/51)
 *
 * The recommended solution is to snapshot the append blob and read from the snapshot blob.
 *
 * This issue occurs because:
 * - blobClient.download() will try to download a blob with a HTTP Get request into a stream.
 * - When a stream unexpectedly ends because of an unreliable network, the pipeline's retry policy will resume the
 *   stream from that broken point with a new HTTP Get request.
 * - The second HTTP request will use a conditional header `IfMatch` with the blob's `ETag` from the first request to
 *   make sure the blob hasn't changed between the first and second attempts. Otherwise, an HTTP 412 error will be
 *   returned indicating that the `ETag` has changed.
 * - This strict strategy is used to avoid data integrity issues (instead of attempting to continue reading the new
 *   data). For example, the blob may have been totally overwritten by someone else.
 *
 * @summary create and read from a blob snapshot
 */

import { ContainerClient, StorageSharedKeyCredential } from "@azure/storage-blob";

import { streamToBuffer } from "./utils/stream";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  // Enter your storage account name and shared key
  const account = process.env.ACCOUNT_NAME || "<account name>";
  const accountKey = process.env.ACCOUNT_KEY || "<account key>";

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
  console.log(`Create container ${containerName} successfully`, createContainerResponse.requestId);

  // Create a blob
  const content = "hello";
  const blobName = "newblob" + new Date().getTime();
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  const uploadBlobResponse = await blockBlobClient.upload(content, Buffer.byteLength(content));
  console.log(`Uploaded block blob ${blobName} successfully`, uploadBlobResponse.requestId);

  // Downloading blob from the snapshot
  console.log("Downloading blob...");
  const snapshotResponse = await blockBlobClient.createSnapshot();
  const blobSnapshotClient = blockBlobClient.withSnapshot(snapshotResponse.snapshot!);

  const response = await blobSnapshotClient.download(0);
  console.log(
    "Reading response to string...",
    (await blobSnapshotClient.getProperties()).contentLength
  );

  console.log(
    "Downloaded blob content",
    (await streamToBuffer(response.readableStreamBody!)).toString()
  );

  // Delete container
  await containerClient.delete();

  console.log("deleted container");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
