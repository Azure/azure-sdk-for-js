// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to migrate an Azure Cosmos DB Cassandra view from autoscale to manual throughput
 *
 * @summary migrate an Azure Cosmos DB Cassandra view from autoscale to manual throughput
 * x-ms-original-file: 2025-11-01-preview/CosmosDBCassandraViewMigrateToManualThroughput.json
 */
async function cosmosDBCassandraViewMigrateToManualThroughput() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.cassandraResources.migrateCassandraViewToManualThroughput(
    "rg1",
    "ddb1",
    "keyspacename",
    "viewname",
  );
  console.log(result);
}

async function main() {
  await cosmosDBCassandraViewMigrateToManualThroughput();
}

main().catch(console.error);
