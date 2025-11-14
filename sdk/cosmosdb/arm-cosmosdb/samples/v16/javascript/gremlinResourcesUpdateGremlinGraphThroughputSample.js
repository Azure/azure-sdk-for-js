// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Update RUs per second of an Azure Cosmos DB Gremlin graph
 *
 * @summary Update RUs per second of an Azure Cosmos DB Gremlin graph
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/DocumentDB/stable/2025-10-15/examples/CosmosDBGremlinGraphThroughputUpdate.json
 */
async function cosmosDbGremlinGraphThroughputUpdate() {
  const subscriptionId = process.env["COSMOSDB_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["COSMOSDB_RESOURCE_GROUP"] || "rg1";
  const accountName = "ddb1";
  const databaseName = "databaseName";
  const graphName = "graphName";
  const updateThroughputParameters = {
    location: "West US",
    resource: { throughput: 400 },
    tags: {},
  };
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.gremlinResources.beginUpdateGremlinGraphThroughputAndWait(
    resourceGroupName,
    accountName,
    databaseName,
    graphName,
    updateThroughputParameters,
  );
  console.log(result);
}

async function main() {
  await cosmosDbGremlinGraphThroughputUpdate();
}

main().catch(console.error);
