// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to restores a soft-deleted Azure Cosmos DB database account.
 *
 * @summary restores a soft-deleted Azure Cosmos DB database account.
 * x-ms-original-file: 2026-04-01-preview/CosmosDBSoftDeletedDatabaseAccountRestore.json
 */
async function cosmosDBSoftDeletedDatabaseAccountRestore() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  await client.softDeletedDatabaseAccounts.restore("rg2", "West US", "softdeleted-cosmosdb-2");
}

async function main() {
  await cosmosDBSoftDeletedDatabaseAccountRestore();
}

main().catch(console.error);
