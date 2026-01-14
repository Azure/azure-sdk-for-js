// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary explores various error scenarios and their response data
 */

const { BlobServiceClient } = require("@azure/storage-blob");
const { DefaultAzureCredential } = require("@azure/identity");

const { streamToBuffer } = require("./utils/stream.js");

// Load the .env file if it exists
require("dotenv/config");

async function main() {
  const accountName = process.env.ACCOUNT_NAME;
  if (!accountName) {
    throw new Error("ACCOUNT_NAME environment variable is not set.");
  }
  const blobServiceClient = new BlobServiceClient(
    `https://${accountName}.blob.core.windows.net`,
    new DefaultAzureCredential(),
  );

  // Create a container
  console.log("// Create a new container..");
  const containerName = `newcontainer${new Date().getTime()}`;
  let containerClient = blobServiceClient.getContainerClient(containerName);

  let createContainerResponse = await containerClient.create();
  console.log(`Created container ${containerName} successfully,`);
  console.log(
    `requestId - ${createContainerResponse.requestId}, statusCode - ${createContainerResponse._response.status}\n`,
  );

  try {
    // Creating an existing container fails...
    console.log("// Creating an existing container fails...");
    createContainerResponse = await containerClient.create();
  } catch (err) {
    console.log(
      `requestId - ${err.request.requestId}, statusCode - ${err.statusCode}, errorCode - ${err.details.errorCode}\n`,
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
      `requestId - ${err.request.requestId}, statusCode - ${err.statusCode}, errorCode - ${err.details.errorCode}\n`,
    );

    // Create a new block blob
    console.log("// Create a new block blob...");
    const uploadBlobResponse = await blockBlobClient.upload(content, Buffer.byteLength(content));
    console.log(`Uploaded block blob ${blobName} successfully,`);
    console.log(
      `requestId - ${uploadBlobResponse.requestId}, statusCode - ${uploadBlobResponse._response.status}\n`,
    );
  }

  // Invoke getProperties() on an existing blob
  console.log("// Invoke getProperties() on an existing blob...");
  blockBlobClient = containerClient.getBlockBlobClient(blobName);
  const blobProperties = await blockBlobClient.getProperties();
  console.log(
    `getProperties() on blob - ${blobName}, blobType = ${blobProperties.blobType}, accessTier = ${blobProperties.accessTier} `,
  );
  console.log(
    `requestId - ${blobProperties.requestId}, statusCode - ${blobProperties._response.status}\n`,
  );

  try {
    // Downloading from a non existing blob
    console.log("// Downloading from a non existing blob...");
    blockBlobClient = containerClient.getBlockBlobClient("invalid" + blobName);
    await blockBlobClient.download();
  } catch (err) {
    console.log(`download() failed as expected,`);
    console.log(
      `requestId - ${err.request.requestId}, statusCode - ${err.statusCode}, errorCode - ${err.details.errorCode}\n`,
    );

    // Download blob content
    console.log("// Download blob content...");
    blockBlobClient = containerClient.getBlockBlobClient(blobName);
    const downloadBlockBlobResponse = await blockBlobClient.download();
    console.log(
      `Downloaded blob content - ${(await streamToBuffer(downloadBlockBlobResponse.readableStreamBody)).toString()},`,
    );
    console.log(
      `requestId - ${downloadBlockBlobResponse.requestId}, statusCode - ${downloadBlockBlobResponse._response.status}\n`,
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
      `requestId - ${err.request.requestId}, statusCode - ${err.statusCode}, errorCode - ${err.details.errorCode}`,
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
      `requestId - ${err.request.requestId}, statusCode - ${err.statusCode}, errorCode - ${err.details.errorCode}`,
    );
    console.log(`error message - \n${err.details.message}\n`);

    // Delete container
    containerClient = blobServiceClient.getContainerClient(containerName);
    const deleteContainerResponse = await containerClient.delete();
    console.log("Deleted container successfully -");
    console.log(
      `requestId - ${deleteContainerResponse.requestId}, statusCode - ${deleteContainerResponse._response.status}\n`,
    );
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
