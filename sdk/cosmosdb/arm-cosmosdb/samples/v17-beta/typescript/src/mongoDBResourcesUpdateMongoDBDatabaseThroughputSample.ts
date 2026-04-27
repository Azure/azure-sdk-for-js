// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update RUs per second of the an Azure Cosmos DB MongoDB database
 *
 * @summary update RUs per second of the an Azure Cosmos DB MongoDB database
 * x-ms-original-file: 2025-11-01-preview/CosmosDBMongoDBDatabaseThroughputUpdate.json
 */
async function cosmosDBMongoDBDatabaseThroughputUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.mongoDBResources.updateMongoDBDatabaseThroughput(
    "rg1",
    "ddb1",
    "databaseName",
    { location: "West US", resource: { throughput: 400 }, tags: {} },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDBMongoDBDatabaseThroughputUpdate();
}

main().catch(console.error);
