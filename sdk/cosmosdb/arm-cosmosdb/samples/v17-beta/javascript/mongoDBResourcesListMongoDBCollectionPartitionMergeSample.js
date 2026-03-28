// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to merges the partitions of a MongoDB Collection
 *
 * @summary merges the partitions of a MongoDB Collection
 * x-ms-original-file: 2025-11-01-preview/CosmosDBMongoDBCollectionPartitionMerge.json
 */
async function cosmosDBMongoDBCollectionPartitionMerge() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.mongoDBResources.listMongoDBCollectionPartitionMerge(
    "rgName",
    "ddb1",
    "databaseName",
    "collectionName",
    { isDryRun: false },
  );
  console.log(result);
}

async function main() {
  await cosmosDBMongoDBCollectionPartitionMerge();
}

main().catch(console.error);
