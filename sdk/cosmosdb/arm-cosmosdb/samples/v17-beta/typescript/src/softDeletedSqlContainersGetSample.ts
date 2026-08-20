// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieves the properties of a soft-deleted Azure Cosmos DB SQL container. This call requires 'Microsoft.DocumentDB/locations/softDeletedDatabaseAccounts/softDeletedSqlDatabases/softDeletedSqlContainers/read' permission.
 *
 * @summary retrieves the properties of a soft-deleted Azure Cosmos DB SQL container. This call requires 'Microsoft.DocumentDB/locations/softDeletedDatabaseAccounts/softDeletedSqlDatabases/softDeletedSqlContainers/read' permission.
 * x-ms-original-file: 2026-04-01-preview/CosmosDBSoftDeletedSqlContainerGet.json
 */
async function cosmosDBSoftDeletedSqlContainerGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.softDeletedSqlContainers.get(
    "rg1",
    "West US",
    "softdeleted-cosmosdb-1",
    "MyDatabase",
    "MyContainer",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDBSoftDeletedSqlContainerGet();
}

main().catch(console.error);
