// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the notebook workspace for a Cosmos DB account.
 *
 * @summary gets the notebook workspace for a Cosmos DB account.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBNotebookWorkspaceGet.json
 */
async function cosmosDBNotebookWorkspaceGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.notebookWorkspaces.get("rg1", "ddb1", "default");
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDBNotebookWorkspaceGet();
}

main().catch(console.error);
