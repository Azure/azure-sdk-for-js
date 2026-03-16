// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieves the properties of an existing Azure Cosmos DB Throughput Pool
 *
 * @summary retrieves the properties of an existing Azure Cosmos DB Throughput Pool
 * x-ms-original-file: 2025-11-01-preview/throughputPool/CosmosDBThroughputPoolAccountGet.json
 */
async function cosmosDBThroughputPoolAccountGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.throughputPoolAccount.get("rgName", "tp1", "db1");
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDBThroughputPoolAccountGet();
}

main().catch(console.error);
