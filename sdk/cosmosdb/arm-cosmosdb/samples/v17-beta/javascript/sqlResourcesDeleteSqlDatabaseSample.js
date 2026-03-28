// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes an existing Azure Cosmos DB SQL database.
 *
 * @summary deletes an existing Azure Cosmos DB SQL database.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBSqlDatabaseDelete.json
 */
async function cosmosDBSqlDatabaseDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  await client.sqlResources.deleteSqlDatabase("rg1", "ddb1", "databaseName");
}

async function main() {
  await cosmosDBSqlDatabaseDelete();
}

main().catch(console.error);
