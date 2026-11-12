// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieves the properties of a soft-deleted Azure Cosmos DB SQL database. This call requires 'Microsoft.DocumentDB/locations/softDeletedDatabaseAccounts/softDeletedSqlDatabases/read' permission.
 *
 * @summary retrieves the properties of a soft-deleted Azure Cosmos DB SQL database. This call requires 'Microsoft.DocumentDB/locations/softDeletedDatabaseAccounts/softDeletedSqlDatabases/read' permission.
 * x-ms-original-file: 2026-04-01-preview/CosmosDBSoftDeletedSqlDatabaseGet.json
 */
async function cosmosDBSoftDeletedSqlDatabaseGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.softDeletedSqlDatabases.get(
    "rg1",
    "West US",
    "softdeleted-cosmosdb-1",
    "MyDatabase",
  );
  console.log(result);
}

async function main() {
  await cosmosDBSoftDeletedSqlDatabaseGet();
}

main().catch(console.error);
