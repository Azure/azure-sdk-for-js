// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the MongoDB collection under an existing Azure Cosmos DB database account.
 *
 * @summary gets the MongoDB collection under an existing Azure Cosmos DB database account.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBMongoDBCollectionGet.json
 */
async function cosmosDBMongoDBCollectionGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.mongoDBResources.getMongoDBCollection(
    "rgName",
    "ddb1",
    "databaseName",
    "collectionName",
  );
  console.log(result);
}

async function main() {
  await cosmosDBMongoDBCollectionGet();
}

main().catch(console.error);
