// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all the soft-deleted Azure Cosmos DB SQL databases under a soft-deleted database account. This call requires 'Microsoft.DocumentDB/locations/softDeletedDatabaseAccounts/softDeletedSqlDatabases/read' permission.
 *
 * @summary lists all the soft-deleted Azure Cosmos DB SQL databases under a soft-deleted database account. This call requires 'Microsoft.DocumentDB/locations/softDeletedDatabaseAccounts/softDeletedSqlDatabases/read' permission.
 * x-ms-original-file: 2026-04-01-preview/CosmosDBSoftDeletedSqlDatabaseList.json
 */
async function cosmosDBSoftDeletedSqlDatabaseList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.softDeletedSqlDatabases.list(
    "rg1",
    "West US",
    "softdeleted-cosmosdb-1",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDBSoftDeletedSqlDatabaseList();
}

main().catch(console.error);
