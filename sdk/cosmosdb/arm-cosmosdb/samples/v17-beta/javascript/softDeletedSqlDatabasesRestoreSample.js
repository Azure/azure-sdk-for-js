// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to restores a soft-deleted Azure Cosmos DB SQL database.
 *
 * @summary restores a soft-deleted Azure Cosmos DB SQL database.
 * x-ms-original-file: 2026-04-01-preview/CosmosDBSoftDeletedSqlDatabaseRestore.json
 */
async function cosmosDBSoftDeletedSqlDatabaseRestore() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  await client.softDeletedSqlDatabases.restore("rg1", "West US", "ddb1", "softDeletedDatabase1");
}

async function main() {
  await cosmosDBSoftDeletedSqlDatabaseRestore();
}

main().catch(console.error);
