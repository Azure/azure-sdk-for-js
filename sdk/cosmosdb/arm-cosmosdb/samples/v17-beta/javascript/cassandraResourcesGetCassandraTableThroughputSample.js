// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the RUs per second of the Cassandra table under an existing Azure Cosmos DB database account with the provided name.
 *
 * @summary gets the RUs per second of the Cassandra table under an existing Azure Cosmos DB database account with the provided name.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBCassandraTableThroughputGet.json
 */
async function cosmosDBCassandraTableThroughputGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.cassandraResources.getCassandraTableThroughput(
    "rg1",
    "ddb1",
    "keyspaceName",
    "tableName",
  );
  console.log(result);
}

async function main() {
  await cosmosDBCassandraTableThroughputGet();
}

main().catch(console.error);
