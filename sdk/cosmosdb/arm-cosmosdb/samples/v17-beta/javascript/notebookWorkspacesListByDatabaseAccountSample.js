// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the notebook workspace resources of an existing Cosmos DB account.
 *
 * @summary gets the notebook workspace resources of an existing Cosmos DB account.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBNotebookWorkspaceList.json
 */
async function cosmosDBNotebookWorkspaceList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.notebookWorkspaces.listByDatabaseAccount("rg1", "ddb1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await cosmosDBNotebookWorkspaceList();
}

main().catch(console.error);
