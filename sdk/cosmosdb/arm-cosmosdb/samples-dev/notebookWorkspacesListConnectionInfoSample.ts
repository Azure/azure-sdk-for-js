// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieves the connection info for the notebook workspace
 *
 * @summary retrieves the connection info for the notebook workspace
 * x-ms-original-file: 2025-11-01-preview/CosmosDBNotebookWorkspaceListConnectionInfo.json
 */
async function cosmosDBNotebookWorkspaceListConnectionInfo(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.notebookWorkspaces.listConnectionInfo("rg1", "ddb1", "default");
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDBNotebookWorkspaceListConnectionInfo();
}

main().catch(console.error);
