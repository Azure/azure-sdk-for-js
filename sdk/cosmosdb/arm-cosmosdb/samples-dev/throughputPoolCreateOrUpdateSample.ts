// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates an Azure Cosmos DB ThroughputPool account. The "Update" method is preferred when performing updates on an account.
 *
 * @summary creates or updates an Azure Cosmos DB ThroughputPool account. The "Update" method is preferred when performing updates on an account.
 * x-ms-original-file: 2025-11-01-preview/throughputPool/CosmosDBThroughputPoolCreate.json
 */
async function cosmosDBThroughputPoolCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.throughputPool.createOrUpdate("rg1", "tp1", {
    location: "westus2",
    maxThroughput: 10000,
    tags: {},
  });
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDBThroughputPoolCreate();
}

main().catch(console.error);
