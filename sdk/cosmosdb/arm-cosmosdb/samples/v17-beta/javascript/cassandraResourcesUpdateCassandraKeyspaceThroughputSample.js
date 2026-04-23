// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update RUs per second of an Azure Cosmos DB Cassandra Keyspace
 *
 * @summary update RUs per second of an Azure Cosmos DB Cassandra Keyspace
 * x-ms-original-file: 2025-11-01-preview/CosmosDBCassandraKeyspaceThroughputUpdate.json
 */
async function cosmosDBCassandraKeyspaceThroughputUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.cassandraResources.updateCassandraKeyspaceThroughput(
    "rg1",
    "ddb1",
    "keyspaceName",
    { location: "West US", resource: { throughput: 400 }, tags: {} },
  );
  console.log(result);
}

async function main() {
  await cosmosDBCassandraKeyspaceThroughputUpdate();
}

main().catch(console.error);
