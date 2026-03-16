// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the SQL database under an existing Azure Cosmos DB database account with the provided name.
 *
 * @summary gets the SQL database under an existing Azure Cosmos DB database account with the provided name.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBSqlDatabaseGet.json
 */
async function cosmosDBSqlDatabaseGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.sqlResources.getSqlDatabase("rg1", "ddb1", "databaseName");
  console.log(result);
}

async function main() {
  await cosmosDBSqlDatabaseGet();
}

main().catch(console.error);
