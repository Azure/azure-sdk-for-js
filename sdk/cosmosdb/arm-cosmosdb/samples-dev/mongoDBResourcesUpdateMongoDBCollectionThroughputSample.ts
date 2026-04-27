// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update the RUs per second of an Azure Cosmos DB MongoDB collection
 *
 * @summary update the RUs per second of an Azure Cosmos DB MongoDB collection
 * x-ms-original-file: 2025-11-01-preview/CosmosDBMongoDBCollectionThroughputUpdate.json
 */
async function cosmosDBMongoDBCollectionThroughputUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.mongoDBResources.updateMongoDBCollectionThroughput(
    "rg1",
    "ddb1",
    "databaseName",
    "collectionName",
    { location: "West US", resource: { throughput: 400 }, tags: {} },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDBMongoDBCollectionThroughputUpdate();
}

main().catch(console.error);
