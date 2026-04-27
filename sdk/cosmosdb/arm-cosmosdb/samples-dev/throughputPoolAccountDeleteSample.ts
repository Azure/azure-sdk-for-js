// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to removes an existing Azure Cosmos DB database account from a throughput pool.
 *
 * @summary removes an existing Azure Cosmos DB database account from a throughput pool.
 * x-ms-original-file: 2025-11-01-preview/throughputPool/CosmosDBThroughputPoolAccountDelete.json
 */
async function cosmosDBThroughputPoolAccountDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  await client.throughputPoolAccount.delete("rgName", "tp1", "db1");
}

async function main(): Promise<void> {
  await cosmosDBThroughputPoolAccountDelete();
}

main().catch(console.error);
