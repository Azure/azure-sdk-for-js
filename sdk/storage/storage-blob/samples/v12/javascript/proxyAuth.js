// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary configure proxy settings when connecting to the storage service
 */

const { BlobServiceClient } = require("@azure/storage-blob");
const { DefaultAzureCredential } = require("@azure/identity");

// Load the .env file if it exists
require("dotenv/config");

async function main() {
  // Enter your storage account name
  const accountName = process.env.ACCOUNT_NAME;
  if (!accountName) {
    throw new Error("ACCOUNT_NAME environment variable is not set.");
  }

  // To use the manual proxyOptions below, remove this block
  if (!process.env.HTTP_PROXY || !process.env.HTTPS_PROXY) {
    console.warn("Proxy information not provided, but it is required to run this sample. Exiting.");
    return;
  }

  const blobServiceClient = new BlobServiceClient(
    `https://${accountName}.blob.core.windows.net`,
    new DefaultAzureCredential(),
    // The library tries to load the proxy settings from the environment variables like HTTP_PROXY
    // Alternatively, the service client accepts the following `proxyOptions` as part of its options:
    {
      /*
    proxyOptions : {
      // To use these options, remove the section above that checks for HTTP_PROXY or HTTPS_PROXY
      host: "http://localhost",
      port: 3128,
      username: "<username>",
      password: "<password>"
    }
    */
    },
  );

  // Create a container
  const containerName = `newcontainer${new Date().getTime()}`;
  const createContainerResponse = await blobServiceClient
    .getContainerClient(containerName)
    .create();
  console.log(`Created container ${containerName} successfully`, createContainerResponse.requestId);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
