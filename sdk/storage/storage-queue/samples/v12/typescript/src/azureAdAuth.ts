// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME
 *
 * If you are using the browser, you can use `InteractiveBrowserCredential` from `@azure/identity or any other viable
 * implementation of TokenCredential.
 *
 * Setup:
 *   - Authorize access to blobs and queues with Azure Active Directory from a client application.
 *     - See: https://docs.microsoft.com/en-us/azure/storage/common/storage-auth-aad-app
 *
 *   - Register a new AAD application and give permissions to access Azure Storage on behalf of the signed-in user.
 *     - Register a new application in the Azure Active Directory (in the Azure portal).
 *       - See: https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app
 *     - In the "API permissions" section, select "Add a permission" and choose "Microsoft APIs".
 *     - Pick "Azure Storage" and select the checkbox next to `user_impersonation` and then click "Add permissions".
 *       This permits the application to access Azure Storage on behalf of the signed-in user.
 *
 *   - Grant access to Azure Storage Queue data with RBAC in the Azure Portal:
 *     - See: https://docs.microsoft.com/en-us/azure/storage/common/storage-auth-aad-rbac-portal.
 *     - In the azure portal, go to your storage-account and assign the "**Storage Queue Data Contributor**" role to the
 *       registered AAD application from the "Access control (IAM)" tab (in the navigation menu on the left-hand side of
 *       your storage account in the Azure portal).
 *
 *   - Environment setup for the sample:
 *     - From the overview page of your AAD Application, note the `CLIENT ID` and `TENANT ID`. In the "Certificates &
 *       Secrets" tab, create a secret and note that down.
 *     - Make sure you have AZURE_TENANT_ID, AZURE_CLIENT_ID, AZURE_CLIENT_SECRET set as environment variables to
 *       successfully execute the sample. (For example, set these variables in the `.env` file.)
 *
 * @summary authenticate with the storage service using Azure Active Directory
 */

import { QueueServiceClient } from "@azure/storage-queue";
import { DefaultAzureCredential } from "@azure/identity";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

export async function main() {
  // Enter your storage account name and shared key
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

  const queueServiceClient = new QueueServiceClient(
    `https://${account}.queue.core.windows.net`,
    defaultAzureCredential
  );

  console.log("Queues:");
  for await (const item of queueServiceClient.listQueues()) {
    console.log(`- ${item.name}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
