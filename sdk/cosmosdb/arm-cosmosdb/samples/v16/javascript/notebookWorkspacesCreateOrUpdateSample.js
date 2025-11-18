// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Creates the notebook workspace for a Cosmos DB account.
 *
 * @summary Creates the notebook workspace for a Cosmos DB account.
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/DocumentDB/stable/2025-10-15/examples/CosmosDBNotebookWorkspaceCreate.json
 */
async function cosmosDbNotebookWorkspaceCreate() {
  const subscriptionId = process.env["COSMOSDB_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["COSMOSDB_RESOURCE_GROUP"] || "rg1";
  const accountName = "ddb1";
  const notebookWorkspaceName = "default";
  const notebookCreateUpdateParameters = {};
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

async function main() {
  await cosmosDbNotebookWorkspaceCreate();
}

main().catch(console.error);
