// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Migrate an Azure Cosmos DB Cassandra Keyspace from autoscale to manual throughput
 *
 * @summary Migrate an Azure Cosmos DB Cassandra Keyspace from autoscale to manual throughput
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/DocumentDB/preview/2025-11-01-preview/examples/CosmosDBCassandraKeyspaceMigrateToManualThroughput.json
 */
async function cosmosDbCassandraKeyspaceMigrateToManualThroughput() {
  const subscriptionId = process.env["COSMOSDB_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["COSMOSDB_RESOURCE_GROUP"] || "rg1";
  const accountName = "ddb1";
  const keyspaceName = "keyspaceName";
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result =
    await client.cassandraResources.beginMigrateCassandraKeyspaceToManualThroughputAndWait(
      resourceGroupName,
      accountName,
      keyspaceName,
    );
  console.log(result);
}

async function main() {
  await cosmosDbCassandraKeyspaceMigrateToManualThroughput();
}

main().catch(console.error);
