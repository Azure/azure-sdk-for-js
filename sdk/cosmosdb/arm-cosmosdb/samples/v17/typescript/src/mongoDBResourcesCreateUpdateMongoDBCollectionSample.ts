// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update an Azure Cosmos DB MongoDB Collection
 *
 * @summary create or update an Azure Cosmos DB MongoDB Collection
 * x-ms-original-file: 2026-03-15/CosmosDBMongoDBCollectionCreateUpdate.json
 */
async function cosmosDBMongoDBCollectionCreateUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.mongoDBResources.createUpdateMongoDBCollection(
    "rg1",
    "ddb1",
    "databaseName",
    "collectionName",
    {
      location: "West US",
      tags: {},
      resource: {
        id: "collectionName",
        indexes: [
          { key: { keys: ["_ts"] }, options: { expireAfterSeconds: 100, unique: true } },
          { key: { keys: ["_id"] } },
        ],
        shardKey: { testKey: "Hash" },
      },
      options: {},
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDBMongoDBCollectionCreateUpdate();
}

main().catch(console.error);
