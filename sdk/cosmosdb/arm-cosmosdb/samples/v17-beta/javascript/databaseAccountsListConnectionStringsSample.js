// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the connection strings for the specified Azure Cosmos DB database account.
 *
 * @summary lists the connection strings for the specified Azure Cosmos DB database account.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBDatabaseAccountListConnectionStrings.json
 */
async function cosmosDBDatabaseAccountListConnectionStrings() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.databaseAccounts.listConnectionStrings("rg1", "ddb1");
  console.log(result);
}

/**
 * This sample demonstrates how to lists the connection strings for the specified Azure Cosmos DB database account.
 *
 * @summary lists the connection strings for the specified Azure Cosmos DB database account.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBDatabaseAccountListConnectionStringsMongo.json
 */
async function cosmosDBDatabaseAccountListConnectionStringsMongo() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.databaseAccounts.listConnectionStrings("rg1", "mongo-ddb1");
  console.log(result);
}

async function main() {
  await cosmosDBDatabaseAccountListConnectionStrings();
  await cosmosDBDatabaseAccountListConnectionStringsMongo();
}

main().catch(console.error);
