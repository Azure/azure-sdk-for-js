// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Migrate an Azure Cosmos DB Cassandra table from autoscale to manual throughput
 *
 * @summary Migrate an Azure Cosmos DB Cassandra table from autoscale to manual throughput
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/stable/2025-04-15/examples/CosmosDBCassandraTableMigrateToManualThroughput.json
 */

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function cosmosDbCassandraTableMigrateToManualThroughput(): Promise<void> {
  const subscriptionId = process.env["COSMOSDB_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["COSMOSDB_RESOURCE_GROUP"] || "rg1";
  const accountName = "ddb1";
  const keyspaceName = "keyspaceName";
  const tableName = "tableName";
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result =
    await client.cassandraResources.beginMigrateCassandraTableToManualThroughputAndWait(
      resourceGroupName,
      accountName,
      keyspaceName,
      tableName,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDbCassandraTableMigrateToManualThroughput();
}

main().catch(console.error);
