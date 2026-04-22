// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes an existing Azure Cosmos DB MongoDB database.
 *
 * @summary deletes an existing Azure Cosmos DB MongoDB database.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBMongoDBDatabaseDelete.json
 */
async function cosmosDBMongoDBDatabaseDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  await client.mongoDBResources.deleteMongoDBDatabase("rg1", "ddb1", "databaseName");
}

async function main() {
  await cosmosDBMongoDBDatabaseDelete();
}

main().catch(console.error);
