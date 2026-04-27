// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes an existing Azure Cosmos DB Throughput Pool.
 *
 * @summary deletes an existing Azure Cosmos DB Throughput Pool.
 * x-ms-original-file: 2025-11-01-preview/throughputPool/CosmosDBThroughputPoolDelete.json
 */
async function cosmosDBThroughputPoolDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  await client.throughputPool.delete("rgName", "tp1");
}

async function main(): Promise<void> {
  await cosmosDBThroughputPoolDelete();
}

main().catch(console.error);
