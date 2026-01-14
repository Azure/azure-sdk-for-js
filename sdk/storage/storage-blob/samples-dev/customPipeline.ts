// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary use custom HTTP pipeline options when connecting to the service
 * @azsdk-weight 0
 */

import { BlobServiceClient, newPipeline } from "@azure/storage-blob";
import { DefaultAzureCredential } from "@azure/identity";

// Load the .env file if it exists
import "dotenv/config";

async function main(): Promise<void> {
  // Enter your storage account name
  const accountName = process.env.ACCOUNT_NAME;
  if (!accountName) {
    throw new Error("ACCOUNT_NAME environment variable is not set.");
  }

  const pipeline = newPipeline(new DefaultAzureCredential(), {
    // httpClient: MyHTTPClient, // A customized HTTP client implementing IHttpClient interface
    retryOptions: { maxTries: 4 }, // Retry options
    userAgentOptions: { userAgentPrefix: "Sample V1.0.0" }, // Customized telemetry string
  });

  // List containers
  const blobServiceClient = new BlobServiceClient(
    `https://${accountName}.blob.core.windows.net`,
    pipeline,
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
