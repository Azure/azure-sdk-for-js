// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  NotebookWorkspaceCreateUpdateParameters} from "@azure/arm-cosmosdb";
import {
  CosmosDBManagementClient,
} from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates the notebook workspace for a Cosmos DB account.
 *
 * @summary Creates the notebook workspace for a Cosmos DB account.
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/DocumentDB/preview/2025-11-01-preview/examples/CosmosDBNotebookWorkspaceCreate.json
 */
async function cosmosDbNotebookWorkspaceCreate(): Promise<void> {
  const subscriptionId = process.env["COSMOSDB_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["COSMOSDB_RESOURCE_GROUP"] || "rg1";
  const accountName = "ddb1";
  const notebookWorkspaceName = "default";
  const notebookCreateUpdateParameters: NotebookWorkspaceCreateUpdateParameters =
    {};
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.notebookWorkspaces.beginCreateOrUpdateAndWait(
    resourceGroupName,
    accountName,
    notebookWorkspaceName,
    notebookCreateUpdateParameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDbNotebookWorkspaceCreate();
}

main().catch(console.error);
