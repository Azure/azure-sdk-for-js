// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Migrate an Azure Cosmos DB Gremlin graph from autoscale to manual throughput
 *
 * @summary Migrate an Azure Cosmos DB Gremlin graph from autoscale to manual throughput
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/DocumentDB/preview/2025-11-01-preview/examples/CosmosDBGremlinGraphMigrateToManualThroughput.json
 */
async function cosmosDbGremlinGraphMigrateToManualThroughput() {
  const subscriptionId = process.env["COSMOSDB_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["COSMOSDB_RESOURCE_GROUP"] || "rg1";
  const accountName = "ddb1";
  const databaseName = "databaseName";
  const graphName = "graphName";
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.gremlinResources.beginMigrateGremlinGraphToManualThroughputAndWait(
    resourceGroupName,
    accountName,
    databaseName,
    graphName,
  );
  console.log(result);
}

async function main() {
  await cosmosDbGremlinGraphMigrateToManualThroughput();
}

main().catch(console.error);
