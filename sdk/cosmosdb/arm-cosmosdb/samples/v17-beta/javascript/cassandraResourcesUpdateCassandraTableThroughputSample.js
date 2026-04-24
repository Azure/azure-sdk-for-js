// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update RUs per second of an Azure Cosmos DB Cassandra table
 *
 * @summary update RUs per second of an Azure Cosmos DB Cassandra table
 * x-ms-original-file: 2025-11-01-preview/CosmosDBCassandraTableThroughputUpdate.json
 */
async function cosmosDBCassandraTableThroughputUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.cassandraResources.updateCassandraTableThroughput(
    "rg1",
    "ddb1",
    "keyspaceName",
    "tableName",
    { location: "West US", resource: { throughput: 400 }, tags: {} },
  );
  console.log(result);
}

async function main() {
  await cosmosDBCassandraTableThroughputUpdate();
}

main().catch(console.error);
