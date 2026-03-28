// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the Cassandra keyspaces under an existing Azure Cosmos DB database account with the provided name.
 *
 * @summary gets the Cassandra keyspaces under an existing Azure Cosmos DB database account with the provided name.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBCassandraKeyspaceGet.json
 */
async function cosmosDBCassandraKeyspaceGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.cassandraResources.getCassandraKeyspace(
    "rg1",
    "ddb1",
    "keyspaceName",
  );
  console.log(result);
}

async function main() {
  await cosmosDBCassandraKeyspaceGet();
}

main().catch(console.error);
