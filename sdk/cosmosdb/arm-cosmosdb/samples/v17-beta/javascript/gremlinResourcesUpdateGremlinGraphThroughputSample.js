// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update RUs per second of an Azure Cosmos DB Gremlin graph
 *
 * @summary update RUs per second of an Azure Cosmos DB Gremlin graph
 * x-ms-original-file: 2025-11-01-preview/CosmosDBGremlinGraphThroughputUpdate.json
 */
async function cosmosDBGremlinGraphThroughputUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.gremlinResources.updateGremlinGraphThroughput(
    "rg1",
    "ddb1",
    "databaseName",
    "graphName",
    { location: "West US", resource: { throughput: 400 }, tags: {} },
  );
  console.log(result);
}

async function main() {
  await cosmosDBGremlinGraphThroughputUpdate();
}

main().catch(console.error);
