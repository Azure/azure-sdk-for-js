// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to restores a soft-deleted Azure Cosmos DB database account.
 *
 * @summary restores a soft-deleted Azure Cosmos DB database account.
 * x-ms-original-file: 2026-04-01-preview/CosmosDBSoftDeletedDatabaseAccountRestore.json
 */
async function cosmosDBSoftDeletedDatabaseAccountRestore(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  await client.softDeletedDatabaseAccounts.restore("rg2", "West US", "softdeleted-cosmosdb-2");
}

async function main(): Promise<void> {
  await cosmosDBSoftDeletedDatabaseAccountRestore();
}

main().catch(console.error);
