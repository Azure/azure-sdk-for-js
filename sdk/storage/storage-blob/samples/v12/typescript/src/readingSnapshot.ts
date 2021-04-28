// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * This sample creates a snapshot of a blob and downloads that snapshot.
 *
 * This technique has some advantages over simply downloading the blob. For
 * example: attempting to download an append blob that is being actively
 * appended may result in an HTTP 412 (Precondition Failed) error (see
 * https://github.com/Azure/azure-storage-js/issues/51).
 *
 * We recommend creating a snapshot of the append blob and reading from the
 * snapshot blob.
 *
 * More information: When the client attempts to `download()` an active append
 * blob to a stream, the stream may unexpectedly end (for example, in the case
 * of an unreliable network), and the client's retry policy will attempt to
 * resume the stream. However, the retry requests will configure
 * preconfiditions to ensure that the blob's ETag does not unexpectedly change
 * during the retry. This policy avoids data integrity issues (for example, if
 * the blob were to be totally overwritten by someone else).
 *
 * @summary create and read from a blob snapshot
 */

import { ContainerClient, StorageSharedKeyCredential } from "@azure/storage-blob";

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

// A helper method used to read a Node.js readable stream into a Buffer
async function streamToBuffer(readableStream: NodeJS.ReadableStream): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    readableStream.on("data", (data: Buffer | string) => {
      chunks.push(data instanceof Buffer ? data : Buffer.from(data));
    });
    readableStream.on("end", () => {
      resolve(Buffer.concat(chunks));
    });
    readableStream.on("error", reject);
  });
}

main().catch((err) => {
  console.error("Error running sample:", err.message);
});
