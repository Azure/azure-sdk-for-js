// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to migrate an Azure Cosmos DB Gremlin database from manual throughput to autoscale
 *
 * @summary migrate an Azure Cosmos DB Gremlin database from manual throughput to autoscale
 * x-ms-original-file: 2025-11-01-preview/CosmosDBGremlinDatabaseMigrateToAutoscale.json
 */
async function cosmosDBGremlinDatabaseMigrateToAutoscale() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.gremlinResources.migrateGremlinDatabaseToAutoscale(
    "rg1",
    "ddb1",
    "databaseName",
  );
  console.log(result);
}

async function main() {
  await cosmosDBGremlinDatabaseMigrateToAutoscale();
}

main().catch(console.error);
