// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to regenerates the auth token for the notebook workspace
 *
 * @summary regenerates the auth token for the notebook workspace
 * x-ms-original-file: 2025-11-01-preview/CosmosDBNotebookWorkspaceRegenerateAuthToken.json
 */
async function cosmosDBNotebookWorkspaceRegenerateAuthToken(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  await client.notebookWorkspaces.regenerateAuthToken("rg1", "ddb1", "default");
}

async function main(): Promise<void> {
  await cosmosDBNotebookWorkspaceRegenerateAuthToken();
}

main().catch(console.error);
