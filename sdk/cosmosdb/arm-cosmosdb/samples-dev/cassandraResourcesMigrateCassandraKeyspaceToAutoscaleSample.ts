// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Migrate an Azure Cosmos DB Cassandra Keyspace from manual throughput to autoscale
 *
 * @summary Migrate an Azure Cosmos DB Cassandra Keyspace from manual throughput to autoscale
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/stable/2025-04-15/examples/CosmosDBCassandraKeyspaceMigrateToAutoscale.json
 */

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function cosmosDbCassandraKeyspaceMigrateToAutoscale(): Promise<void> {
  const subscriptionId = process.env["COSMOSDB_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["COSMOSDB_RESOURCE_GROUP"] || "rg1";
  const accountName = "ddb1";
  const keyspaceName = "keyspaceName";
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result =
    await client.cassandraResources.beginMigrateCassandraKeyspaceToAutoscaleAndWait(
      resourceGroupName,
      accountName,
      keyspaceName,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDbCassandraKeyspaceMigrateToAutoscale();
}

main().catch(console.error);
