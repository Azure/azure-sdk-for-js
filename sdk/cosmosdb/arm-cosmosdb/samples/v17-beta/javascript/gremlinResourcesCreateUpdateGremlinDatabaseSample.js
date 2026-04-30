// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update an Azure Cosmos DB Gremlin database
 *
 * @summary create or update an Azure Cosmos DB Gremlin database
 * x-ms-original-file: 2025-11-01-preview/CosmosDBGremlinDatabaseCreateUpdate.json
 */
async function cosmosDBGremlinDatabaseCreateUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.gremlinResources.createUpdateGremlinDatabase(
    "rg1",
    "ddb1",
    "databaseName",
    { location: "West US", options: {}, resource: { id: "databaseName" }, tags: {} },
  );
  console.log(result);
}

async function main() {
  await cosmosDBGremlinDatabaseCreateUpdate();
}

main().catch(console.error);
