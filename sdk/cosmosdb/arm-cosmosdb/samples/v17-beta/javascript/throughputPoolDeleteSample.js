// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes an existing Azure Cosmos DB Throughput Pool.
 *
 * @summary deletes an existing Azure Cosmos DB Throughput Pool.
 * x-ms-original-file: 2025-11-01-preview/throughputPool/CosmosDBThroughputPoolDelete.json
 */
async function cosmosDBThroughputPoolDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  await client.throughputPool.delete("rgName", "tp1");
}

async function main() {
  await cosmosDBThroughputPoolDelete();
}

main().catch(console.error);
