// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME
 *
 * If you are using the browser, you can use the InteractiveBrowserCredential provided via @azure/identity or any other
 * feasible implementation of TokenCredential.
 *
 * Setup:
 *   - Reference - Authorize access to blobs and queues with Azure Active Directory from a client application
 *     - https://docs.microsoft.com/en-us/azure/storage/common/storage-auth-aad-app
 *   - Register a new AAD application and give permissions to access Azure Storage on behalf of the signed-in user
 *     - Register a new application in the Azure Active Directory(in the azure-portal) - https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app
 *     - In the `API permissions` section, select `Add a permission` and choose `Microsoft APIs`.
 *     - Pick `Azure Storage` and select the checkbox next to `user_impersonation` and then click `Add permissions`. This would allow the application to access Azure Storage on behalf of the signed-in user.
 *   - Grant access to Azure Blob data with RBAC in the Azure Portal
 *     - RBAC roles for blobs and queues - https://docs.microsoft.com/en-us/azure/storage/common/storage-auth-aad-rbac-portal.
 *     - In the azure portal, go to your storage-account and assign **Storage Blob Data Contributor** role to the registered AAD application from `Access control (IAM)` tab (in the left-side-navbar of your storage account in the azure-portal).
 *
 *   - Environment setup for the sample
 *     - From the overview page of your AAD Application, note down the `CLIENT ID` and `TENANT ID`. In the "Certificates & Secrets" tab, create a secret and note that down.
 *     - Make sure you have AZURE_TENANT_ID, AZURE_CLIENT_ID, AZURE_CLIENT_SECRET as environment variables to successfully execute the sample(Can leverage process.env).
 *
 * @summary authenticate with the storage service using Azure Active Directory
 * @azsdk-weight 90
 **/

import { BlobServiceClient } from "@azure/storage-blob";
import { DefaultAzureCredential } from "@azure/identity";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  // Enter your storage account name
  const account = process.env.ACCOUNT_NAME || "<account name>";

  // ONLY AVAILABLE IN NODE.JS RUNTIME
  // If you are using the browser, you can use the InteractiveBrowserCredential provided via @azure/identity or any
  // other feasible implementation of TokenCredential. DefaultAzureCredential will first look for Azure Active Directory
  // (AAD) client secret credential information in the following environment variables:
  //
  // - AZURE_TENANT_ID: The ID of your AAD tenant
  // - AZURE_CLIENT_ID: The ID of your AAD app registration (client)
  // - AZURE_CLIENT_SECRET: The client secret for your AAD app registration
  //
  // If those environment variables aren't found and your application is deployed
  // to an Azure VM or App Service instance, the managed service identity endpoint
  // will be used as a fallback authentication source.

  const blobServiceClient = new BlobServiceClient(
    `https://${account}.blob.core.windows.net`,
    new DefaultAzureCredential()
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
