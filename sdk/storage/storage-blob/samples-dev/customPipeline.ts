// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary use custom HTTP pipeline options when connecting to the service
 * @azsdk-weight 0
 */

import { BlobServiceClient, StorageSharedKeyCredential, newPipeline } from "@azure/storage-blob";

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

  // Use sharedKeyCredential, tokenCredential or anonymousCredential to create a pipeline
  const pipeline = newPipeline(sharedKeyCredential, {
    // httpClient: MyHTTPClient, // A customized HTTP client implementing IHttpClient interface
    retryOptions: { maxTries: 4 }, // Retry options
    userAgentOptions: { userAgentPrefix: "Sample V1.0.0" }, // Customized telemetry string
  });

  // List containers
  const blobServiceClient = new BlobServiceClient(
    `https://${account}.blob.core.windows.net`,
    pipeline
  );

  let i = 1;
  for await (const container of blobServiceClient.listContainers()) {
    console.log(`Container ${i++}: ${container.name}`);
  }

  // Create a container
  const containerName = `newcontainer${new Date().getTime()}`;
  const containerClient = blobServiceClient.getContainerClient(containerName);

  const createContainerResponse = await containerClient.create();
  console.log(`Created container ${containerName} successfully`, createContainerResponse.requestId);

  // Delete container
  await containerClient.delete();

  console.log("Deleted container:", containerClient.containerName);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
