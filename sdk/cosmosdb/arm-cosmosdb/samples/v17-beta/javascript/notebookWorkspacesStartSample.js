// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to starts the notebook workspace
 *
 * @summary starts the notebook workspace
 * x-ms-original-file: 2025-11-01-preview/CosmosDBNotebookWorkspaceStart.json
 */
async function cosmosDBNotebookWorkspaceStart() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  await client.notebookWorkspaces.start("rg1", "ddb1", "default");
}

async function main() {
  await cosmosDBNotebookWorkspaceStart();
}

main().catch(console.error);
