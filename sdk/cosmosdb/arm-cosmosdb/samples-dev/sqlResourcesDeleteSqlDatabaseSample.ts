// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes an existing Azure Cosmos DB SQL database.
 *
 * @summary deletes an existing Azure Cosmos DB SQL database.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBSqlDatabaseDelete.json
 */
async function cosmosDBSqlDatabaseDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  await client.sqlResources.deleteSqlDatabase("rg1", "ddb1", "databaseName");
}

async function main(): Promise<void> {
  await cosmosDBSqlDatabaseDelete();
}

main().catch(console.error);
