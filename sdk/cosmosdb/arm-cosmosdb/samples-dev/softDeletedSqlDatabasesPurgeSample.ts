// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to permanently deletes a soft-deleted Azure Cosmos DB SQL database.
 *
 * @summary permanently deletes a soft-deleted Azure Cosmos DB SQL database.
 * x-ms-original-file: 2026-04-01-preview/CosmosDBSoftDeletedSqlDatabasePurge.json
 */
async function cosmosDBSoftDeletedSqlDatabasePurge(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  await client.softDeletedSqlDatabases.purge(
    "rg1",
    "West US",
    "softdeleted-cosmosdb-1",
    "MyDatabase",
  );
}

async function main(): Promise<void> {
  await cosmosDBSoftDeletedSqlDatabasePurge();
}

main().catch(console.error);
