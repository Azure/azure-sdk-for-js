// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary explores various error scenarios and their response data
 */

import { BlobServiceClient } from "@azure/storage-blob";

import { streamToBuffer } from "./utils/stream";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  // Create Blob Service Client from Account connection string or SAS connection string
  // Account connection string example - `DefaultEndpointsProtocol=https;AccountName=myaccount;AccountKey=accountKey;EndpointSuffix=core.windows.net`
  // SAS connection string example - `BlobEndpoint=https://myaccount.blob.core.windows.net/;QueueEndpoint=https://myaccount.queue.core.windows.net/;FileEndpoint=https://myaccount.file.core.windows.net/;TableEndpoint=https://myaccount.table.core.windows.net/;SharedAccessSignature=sasString`
  const STORAGE_CONNECTION_STRING = process.env.STORAGE_CONNECTION_STRING || "";
  // Note - Account connection string can only be used in node.
  const blobServiceClient = BlobServiceClient.fromConnectionString(STORAGE_CONNECTION_STRING);

  // Create a container
  console.log("// Create a new container..");
  const containerName = `newcontainer${new Date().getTime()}`;
  let containerClient = blobServiceClient.getContainerClient(containerName);

  let createContainerResponse = await containerClient.create();
  console.log(`Created container ${containerName} successfully,`);
  console.log(
    `requestId - ${createContainerResponse.requestId}, statusCode - ${createContainerResponse._response.status}\n`
  );

  try {
    // Creating an existing container fails...
    console.log("// Creating an existing container fails...");
    createContainerResponse = await containerClient.create();
  } catch (err) {
    console.log(
      `requestId - ${err.details.requestId}, statusCode - ${err.statusCode}, errorCode - ${err.details.errorCode}\n`
    );
  }

  // Create a blockBlobClient
  const content = "hello";
  const blobName = "newblob" + new Date().getTime();
  let blockBlobClient = containerClient.getBlockBlobClient(blobName);

  try {
    // Invoke getProperties() on a non existing blob
    console.log("// Invoke getProperties() on a non existing blob...");
    await blockBlobClient.getProperties();
  } catch (err) {
    console.log(`getProperties() failed as expected,`);
    console.log(
      `requestId - ${err.details.requestId}, statusCode - ${err.statusCode}, errorCode - ${err.details.errorCode}\n`
    );

    // Create a new block blob
    console.log("// Create a new block blob...");
    const uploadBlobResponse = await blockBlobClient.upload(content, Buffer.byteLength(content));
    console.log(`Uploaded block blob ${blobName} successfully,`);
    console.log(
      `requestId - ${uploadBlobResponse.requestId}, statusCode - ${uploadBlobResponse._response.status}\n`
    );
  }

  // Invoke getProperties() on an existing blob
  console.log("// Invoke getProperties() on an existing blob...");
  blockBlobClient = containerClient.getBlockBlobClient(blobName);
  const blobProperties = await blockBlobClient.getProperties();
  console.log(
    `getProperties() on blob - ${blobName}, blobType = ${blobProperties.blobType}, accessTier = ${blobProperties.accessTier} `
  );
  console.log(
    `requestId - ${blobProperties.requestId}, statusCode - ${blobProperties._response.status}\n`
  );

  try {
    // Downloading from a non existing blob
    console.log("// Downloading from a non existing blob...");
    blockBlobClient = containerClient.getBlockBlobClient("invalid" + blobName);
    await blockBlobClient.download();
  } catch (err) {
    console.log(`download() failed as expected,`);
    console.log(
      `requestId - ${err.details.requestId}, statusCode - ${err.statusCode}, errorCode - ${err.details.errorCode}\n`
    );

    // Download blob content
    console.log("// Download blob content...");
    blockBlobClient = containerClient.getBlockBlobClient(blobName);
    const downloadBlockBlobResponse = await blockBlobClient.download();
    console.log(
      `Downloaded blob content - ${(
        await streamToBuffer(downloadBlockBlobResponse.readableStreamBody!)
      ).toString()},`
    );
    console.log(
      `requestId - ${downloadBlockBlobResponse.requestId}, statusCode - ${downloadBlockBlobResponse._response.status}\n`
    );
  }

  try {
    // Archive the blob
    blockBlobClient = containerClient.getBlockBlobClient(blobName);
    await blockBlobClient.setAccessTier("Archive");
    // Downloading an archived blockBlob fails
    console.log("// Downloading an archived blockBlob fails...");
    await blockBlobClient.download();
  } catch (err) {
    // BlobArchived	Conflict (409)	This operation is not permitted on an archived blob.
    console.log(
      `requestId - ${err.details.requestId}, statusCode - ${err.statusCode}, errorCode - ${err.details.errorCode}`
    );
    console.log(`error message - ${err.details.message}\n`);
  }

  // Delete container
  try {
    // Deleting a non-existing container
    console.log("// Deleting a non-existing container...");
    containerClient = blobServiceClient.getContainerClient("invalid" + containerName);
    await containerClient.delete();
  } catch (err) {
    console.log(`Deleting a non-existing container fails as expected`);
    console.log(
      `requestId - ${err.details.requestId}, statusCode - ${err.statusCode}, errorCode - ${err.details.errorCode}`
    );
    console.log(`error message - \n${err.details.message}\n`);

    // Delete container
    containerClient = blobServiceClient.getContainerClient(containerName);
    const deleteContainerResponse = await containerClient.delete();
    console.log("Deleted container successfully -");
    console.log(
      `requestId - ${deleteContainerResponse.requestId}, statusCode - ${deleteContainerResponse._response.status}\n`
    );
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
