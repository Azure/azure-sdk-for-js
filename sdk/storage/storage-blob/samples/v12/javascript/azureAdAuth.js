// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * This sample uses the `@azure/identity` package to authenticate with Azure
 * Active directory instead of using a static API credential or SAS token.
 *
 * Please be aware that the `DefaultAzureCredential` used below is only
 * compatible with Node.js. If you wish to adapt this sample for the browser,
 * please see the `InteractiveBrowserCredential` class in `@azure/identity` or
 * consider an alternative implementation of `TokenCredential` to provide an
 * AAD access token.
 *
 * @summary authenticate using Azure Active Directory
 */

const { BlobServiceClient } = require("@azure/storage-blob");
const { DefaultAzureCredential } = require("@azure/identity");

// Load the .env file if it exists
const dotenv = require("dotenv");
dotenv.config();

async function main() {
  // Enter your storage account name
  const account = process.env.ACCOUNT_NAME || "";

  // Azure AD Credential information is required to run this sample:
  if (
    !process.env.AZURE_TENANT_ID ||
    !process.env.AZURE_CLIENT_ID ||
    !process.env.AZURE_CLIENT_SECRET
  ) {
    console.warn(
      "Azure AD authentication information not provided, but it is required to run this sample. Exiting."
    );
    return;
  }

  // ONLY AVAILABLE IN NODE.JS RUNTIME
  // If you are using the browser, you can use the InteractiveBrowserCredential provided via @azure/identity or any other feasible implementation of TokenCredential.
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
  const defaultAzureCredential = new DefaultAzureCredential();

  const blobServiceClient = new BlobServiceClient(
    `https://${account}.blob.core.windows.net`,
    defaultAzureCredential
  );

  // Create a container
  const containerName = `newcontainer${new Date().getTime()}`;
  const createContainerResponse = await blobServiceClient
    .getContainerClient(containerName)
    .create();
  console.log(`Created container ${containerName} successfully`, createContainerResponse.requestId);
}

main().catch((err) => {
  console.error("Error running sample:", err.message);
});
