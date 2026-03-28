// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update an Azure Cosmos DB MongoDB Collection
 *
 * @summary create or update an Azure Cosmos DB MongoDB Collection
 * x-ms-original-file: 2025-11-01-preview/CosmosDBMongoDBCollectionCreateUpdate.json
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
      options: {},
      resource: {
        analyticalStorageTtl: 500,
        id: "collectionName",
        indexes: [
          { key: { keys: ["_ts"] }, options: { expireAfterSeconds: 100, unique: true } },
          { key: { keys: ["_id"] } },
        ],
        shardKey: { testKey: "Hash" },
      },
      tags: {},
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create or update an Azure Cosmos DB MongoDB Collection
 *
 * @summary create or update an Azure Cosmos DB MongoDB Collection
 * x-ms-original-file: 2025-11-01-preview/CosmosDBMongoDBCollectionRestore.json
 */
async function cosmosDBMongoDBCollectionRestore(): Promise<void> {
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
      options: {},
      resource: {
        createMode: "Restore",
        id: "collectionName",
        restoreParameters: {
          restoreSource:
            "/subscriptions/00000000-1111-2222-3333-444444444444/providers/Microsoft.DocumentDB/locations/WestUS/restorableDatabaseAccounts/restorableDatabaseAccountId",
          restoreTimestampInUtc: new Date("2022-07-20T18:28:00Z"),
          restoreWithTtlDisabled: false,
        },
      },
      tags: {},
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDBMongoDBCollectionCreateUpdate();
  await cosmosDBMongoDBCollectionRestore();
}

main().catch(console.error);
