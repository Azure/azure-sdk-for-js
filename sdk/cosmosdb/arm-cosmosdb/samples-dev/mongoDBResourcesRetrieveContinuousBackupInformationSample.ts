// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieves continuous backup information for a Mongodb collection.
 *
 * @summary retrieves continuous backup information for a Mongodb collection.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBMongoDBCollectionBackupInformation.json
 */
async function cosmosDBMongoDBCollectionBackupInformation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.mongoDBResources.retrieveContinuousBackupInformation(
    "rgName",
    "ddb1",
    "databaseName",
    "collectionName",
    { location: "North Europe" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDBMongoDBCollectionBackupInformation();
}

main().catch(console.error);
