// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the MongoDB collection under an existing Azure Cosmos DB database account.
 *
 * @summary gets the MongoDB collection under an existing Azure Cosmos DB database account.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBMongoDBCollectionGet.json
 */
async function cosmosDBMongoDBCollectionGet(): Promise<void> {
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

async function main(): Promise<void> {
  await cosmosDBMongoDBCollectionGet();
}

main().catch(console.error);
