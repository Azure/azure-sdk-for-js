// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to permanently deletes (purges) a soft-deleted Azure Cosmos DB database account.
 *
 * @summary permanently deletes (purges) a soft-deleted Azure Cosmos DB database account.
 * x-ms-original-file: 2026-04-01-preview/CosmosDBSoftDeletedDatabaseAccountPurge.json
 */
async function cosmosDBSoftDeletedDatabaseAccountPurge() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  await client.softDeletedDatabaseAccounts.purge("rg1", "West US", "softdeleted-cosmosdb-1");
}

async function main() {
  await cosmosDBSoftDeletedDatabaseAccountPurge();
}

main().catch(console.error);
