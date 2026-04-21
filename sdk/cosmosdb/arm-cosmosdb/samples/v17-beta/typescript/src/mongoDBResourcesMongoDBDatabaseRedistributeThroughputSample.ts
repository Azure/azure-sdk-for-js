// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to redistribute throughput for an Azure Cosmos DB MongoDB database
 *
 * @summary redistribute throughput for an Azure Cosmos DB MongoDB database
 * x-ms-original-file: 2025-11-01-preview/CosmosDBMongoDBDatabaseRedistributeThroughput.json
 */
async function cosmosDBMongoDBDatabaseRedistributeThroughput(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.mongoDBResources.mongoDBDatabaseRedistributeThroughput(
    "rg1",
    "ddb1",
    "databaseName",
    {
      resource: {
        sourcePhysicalPartitionThroughputInfo: [{ id: "2", throughput: 5000 }, { id: "3" }],
        targetPhysicalPartitionThroughputInfo: [
          { id: "0", throughput: 5000 },
          { id: "1", throughput: 5000 },
        ],
        throughputPolicy: "custom",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDBMongoDBDatabaseRedistributeThroughput();
}

main().catch(console.error);
