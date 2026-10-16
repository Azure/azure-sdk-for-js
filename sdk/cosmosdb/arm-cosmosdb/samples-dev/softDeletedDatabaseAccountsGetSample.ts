// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieves the properties of a soft-deleted Azure Cosmos DB database account by location and accountName. This call requires 'Microsoft.DocumentDB/locations/softDeletedDatabaseAccounts/read' permission.
 *
 * @summary retrieves the properties of a soft-deleted Azure Cosmos DB database account by location and accountName. This call requires 'Microsoft.DocumentDB/locations/softDeletedDatabaseAccounts/read' permission.
 * x-ms-original-file: 2026-04-01-preview/CosmosDBSoftDeletedDatabaseAccountGet.json
 */
async function cosmosDBSoftDeletedDatabaseAccountGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.softDeletedDatabaseAccounts.get(
    "rg1",
    "West US",
    "softdeleted-cosmosdb-1",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDBSoftDeletedDatabaseAccountGet();
}

main().catch(console.error);
