// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Migrate an Azure Cosmos DB Cassandra table from manual throughput to autoscale
 *
 * @summary Migrate an Azure Cosmos DB Cassandra table from manual throughput to autoscale
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/DocumentDB/preview/2025-11-01-preview/examples/CosmosDBCassandraTableMigrateToAutoscale.json
 */
async function cosmosDbCassandraTableMigrateToAutoscale(): Promise<void> {
  const subscriptionId = process.env["COSMOSDB_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["COSMOSDB_RESOURCE_GROUP"] || "rg1";
  const accountName = "ddb1";
  const keyspaceName = "keyspaceName";
  const tableName = "tableName";
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result =
    await client.cassandraResources.beginMigrateCassandraTableToAutoscaleAndWait(
      resourceGroupName,
      accountName,
      keyspaceName,
      tableName,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDbCassandraTableMigrateToAutoscale();
}

main().catch(console.error);
