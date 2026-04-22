// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to migrate an Azure Cosmos DB SQL database from autoscale to manual throughput
 *
 * @summary migrate an Azure Cosmos DB SQL database from autoscale to manual throughput
 * x-ms-original-file: 2025-11-01-preview/CosmosDBSqlDatabaseMigrateToManualThroughput.json
 */
async function cosmosDBSqlDatabaseMigrateToManualThroughput(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.sqlResources.migrateSqlDatabaseToManualThroughput(
    "rg1",
    "ddb1",
    "databaseName",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDBSqlDatabaseMigrateToManualThroughput();
}

main().catch(console.error);
