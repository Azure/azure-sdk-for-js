// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates the properties of an existing Azure Cosmos DB Throughput Pool.
 *
 * @summary updates the properties of an existing Azure Cosmos DB Throughput Pool.
 * x-ms-original-file: 2025-11-01-preview/throughputPool/CosmosDBThroughputPoolUpdate.json
 */
async function cosmosDBThroughputPoolUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.throughputPool.update("rg1", "tp1", {
    body: { maxThroughput: 10000 },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDBThroughputPoolUpdate();
}

main().catch(console.error);
