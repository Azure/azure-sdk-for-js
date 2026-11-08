// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all the soft-deleted Azure Cosmos DB SQL containers under a soft-deleted SQL database. This call requires 'Microsoft.DocumentDB/locations/softDeletedDatabaseAccounts/softDeletedSqlDatabases/softDeletedSqlContainers/read' permission.
 *
 * @summary lists all the soft-deleted Azure Cosmos DB SQL containers under a soft-deleted SQL database. This call requires 'Microsoft.DocumentDB/locations/softDeletedDatabaseAccounts/softDeletedSqlDatabases/softDeletedSqlContainers/read' permission.
 * x-ms-original-file: 2026-04-01-preview/CosmosDBSoftDeletedSqlContainerList.json
 */
async function cosmosDBSoftDeletedSqlContainerList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.softDeletedSqlContainers.list(
    "rg1",
    "West US",
    "softdeleted-cosmosdb-1",
    "MyDatabase",
  );
  console.log(result);
}

async function main() {
  await cosmosDBSoftDeletedSqlContainerList();
}

main().catch(console.error);
