// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Create or update an Azure Cosmos DB MongoDB Collection
 *
 * @summary Create or update an Azure Cosmos DB MongoDB Collection
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/stable/2025-04-15/examples/CosmosDBMongoDBCollectionCreateUpdate.json
 */

import {
  MongoDBCollectionCreateUpdateParameters,
  CosmosDBManagementClient,
} from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function cosmosDbMongoDbcollectionCreateUpdate(): Promise<void> {
  const subscriptionId = process.env["COSMOSDB_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["COSMOSDB_RESOURCE_GROUP"] || "rg1";
  const accountName = "ddb1";
  const databaseName = "databaseName";
  const collectionName = "collectionName";
  const createUpdateMongoDBCollectionParameters: MongoDBCollectionCreateUpdateParameters =
    {
      location: "West US",
      options: {},
      resource: {
        id: "collectionName",
        indexes: [
          {
            key: { keys: ["_ts"] },
            options: { expireAfterSeconds: 100, unique: true },
          },
          { key: { keys: ["_id"] } },
        ],
        shardKey: { testKey: "Hash" },
      },
      tags: {},
    };
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result =
    await client.mongoDBResources.beginCreateUpdateMongoDBCollectionAndWait(
      resourceGroupName,
      accountName,
      databaseName,
      collectionName,
      createUpdateMongoDBCollectionParameters,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDbMongoDbcollectionCreateUpdate();
}

main().catch(console.error);
