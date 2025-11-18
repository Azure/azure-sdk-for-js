// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Migrate an Azure Cosmos DB Cassandra table from manual throughput to autoscale
 *
 * @summary Migrate an Azure Cosmos DB Cassandra table from manual throughput to autoscale
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/DocumentDB/stable/2025-10-15/examples/CosmosDBCassandraTableMigrateToAutoscale.json
 */
async function cosmosDbCassandraTableMigrateToAutoscale() {
  const subscriptionId = process.env["COSMOSDB_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["COSMOSDB_RESOURCE_GROUP"] || "rg1";
  const accountName = "ddb1";
  const keyspaceName = "keyspaceName";
  const tableName = "tableName";
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.cassandraResources.beginMigrateCassandraTableToAutoscaleAndWait(
    resourceGroupName,
    accountName,
    keyspaceName,
    tableName,
  );
  console.log(result);
}

async function main() {
  await cosmosDbCassandraTableMigrateToAutoscale();
}

main().catch(console.error);
