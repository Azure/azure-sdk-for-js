// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Setup tracing before importing anything else
import tracer from "./tracing";

/*
 Setup: Enter connection string of your storage account name in main()
*/

import {
  BlobServiceClient,
  StorageSharedKeyCredential,
  BlobDownloadResponseModel
} from "@azure/storage-blob";

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

  // ONLY AVAILABLE IN NODE.JS RUNTIME
  // DefaultAzureCredential will first look for Azure Active Directory (AAD)
  // client secret credentials in the following environment variables:
  //
  // - AZURE_TENANT_ID: The ID of your AAD tenant
  // - AZURE_CLIENT_ID: The ID of your AAD app registration (client)
  // - AZURE_CLIENT_SECRET: The client secret for your AAD app registration
  //
  // If those environment variables aren't found and your application is deployed
  // to an Azure VM or App Service instance, the managed service identity endpoint
  // will be used as a fallback authentication source.
  // const defaultAzureCredential = new DefaultAzureCredential();

  // You can find more TokenCredential implementations in the [@azure/identity](https://www.npmjs.com/package/@azure/identity) library
  // to use client secrets, certificates, or managed identities for authentication.

  // Use AnonymousCredential when url already includes a SAS signature
  // const anonymousCredential = new AnonymousCredential();

  // List containers
  const blobServiceClient = new BlobServiceClient(
    // When using AnonymousCredential, following url should include a valid SAS or support public access
    `https://${account}.blob.core.windows.net`,
    sharedKeyCredential
  );

  let i = 1;
  for await (const container of blobServiceClient.listContainers()) {
    console.log(`Container ${i++}: ${container.name}`);
  }

  // Create a container
  const containerName = `newcontainer${new Date().getTime()}`;
  const containerClient = blobServiceClient.getContainerClient(containerName);

  const createContainerResponse = await containerClient.create();
  console.log(`Create container ${containerName} successfully`, createContainerResponse.requestId);

  // Create a blob
  const content = "hello, 你好";
  const blobName = "newblob" + new Date().getTime();
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  const uploadBlobResponse = await blockBlobClient.upload(content, Buffer.byteLength(content));
  console.log(`Upload block blob ${blobName} successfully`, uploadBlobResponse.requestId);

  // List blobs
  i = 1;
  for await (const blob of containerClient.listBlobsFlat()) {
    console.log(`Blob ${i++}: ${blob.name}`);
  }

  // Get blob content from position 0 to the end
  // In Node.js, get downloaded data by accessing downloadBlockBlobResponse.readableStreamBody
  // In browsers, get downloaded data by accessing downloadBlockBlobResponse.blobBody
  const downloadBlockBlobResponse: BlobDownloadResponseModel = await blockBlobClient.download(0);
  console.log(
    "Downloaded blob content",
    await streamToString(downloadBlockBlobResponse.readableStreamBody!)
  );

  // Delete container
  await containerClient.delete();

  console.log("deleted container");
}

// A helper method used to read a Node.js readable stream into string
async function streamToString(readableStream: NodeJS.ReadableStream) {
  return new Promise((resolve, reject) => {
    const chunks: string[] = [];
    readableStream.on("data", (data) => {
      chunks.push(data.toString());
    });
    readableStream.on("end", () => {
      resolve(chunks.join(""));
    });
    readableStream.on("error", reject);
  });
}

// OPTIONAL: Manually start and propagate a root span
const rootSpan = tracer.startSpan("root span");
tracer.withSpan(rootSpan, () => {
  main()
    .catch((err) => {
      console.error("Error running sample:", err.message);
    })
    .then(() => rootSpan.end()); // End the optional root span on completion
});

console.log("Waiting batched span processor to export batched spans");
setTimeout(() => {
  console.log("Terminating");
}, 6000);
