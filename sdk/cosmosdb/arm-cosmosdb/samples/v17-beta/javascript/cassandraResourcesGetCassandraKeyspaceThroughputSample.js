// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the RUs per second of the Cassandra Keyspace under an existing Azure Cosmos DB database account with the provided name.
 *
 * @summary gets the RUs per second of the Cassandra Keyspace under an existing Azure Cosmos DB database account with the provided name.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBCassandraKeyspaceThroughputGet.json
 */
async function cosmosDBCassandraKeyspaceThroughputGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.cassandraResources.getCassandraKeyspaceThroughput(
    "rg1",
    "ddb1",
    "keyspaceName",
  );
  console.log(result);
}

async function main() {
  await cosmosDBCassandraKeyspaceThroughputGet();
}

main().catch(console.error);
