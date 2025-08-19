// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Regenerates the auth token for the notebook workspace
 *
 * @summary Regenerates the auth token for the notebook workspace
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/stable/2025-04-15/examples/CosmosDBNotebookWorkspaceRegenerateAuthToken.json
 */

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function cosmosDbNotebookWorkspaceRegenerateAuthToken(): Promise<void> {
  const subscriptionId = process.env["COSMOSDB_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["COSMOSDB_RESOURCE_GROUP"] || "rg1";
  const accountName = "ddb1";
  const notebookWorkspaceName = "default";
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result =
    await client.notebookWorkspaces.beginRegenerateAuthTokenAndWait(
      resourceGroupName,
      accountName,
      notebookWorkspaceName,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDbNotebookWorkspaceRegenerateAuthToken();
}

main().catch(console.error);
