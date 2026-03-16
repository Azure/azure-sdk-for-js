// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the RUs per second of the MongoDB collection under an existing Azure Cosmos DB database account with the provided name.
 *
 * @summary gets the RUs per second of the MongoDB collection under an existing Azure Cosmos DB database account with the provided name.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBMongoDBCollectionThroughputGet.json
 */
async function cosmosDBMongoDBCollectionThroughputGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.mongoDBResources.getMongoDBCollectionThroughput(
    "rg1",
    "ddb1",
    "databaseName",
    "collectionName",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDBMongoDBCollectionThroughputGet();
}

main().catch(console.error);
