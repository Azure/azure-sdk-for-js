// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the Cassandra table under an existing Azure Cosmos DB database account.
 *
 * @summary gets the Cassandra table under an existing Azure Cosmos DB database account.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBCassandraTableGet.json
 */
async function cosmosDBCassandraTableGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.cassandraResources.getCassandraTable(
    "rg1",
    "ddb1",
    "keyspaceName",
    "tableName",
  );
  console.log(result);
}

async function main() {
  await cosmosDBCassandraTableGet();
}

main().catch(console.error);
