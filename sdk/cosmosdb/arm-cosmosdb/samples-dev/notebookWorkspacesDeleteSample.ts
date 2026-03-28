// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the notebook workspace for a Cosmos DB account.
 *
 * @summary deletes the notebook workspace for a Cosmos DB account.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBNotebookWorkspaceDelete.json
 */
async function cosmosDBNotebookWorkspaceDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  await client.notebookWorkspaces.delete("rg1", "ddb1", "default");
}

async function main(): Promise<void> {
  await cosmosDBNotebookWorkspaceDelete();
}

main().catch(console.error);
