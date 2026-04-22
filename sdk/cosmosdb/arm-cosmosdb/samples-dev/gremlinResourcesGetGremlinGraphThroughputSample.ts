// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the Gremlin graph throughput under an existing Azure Cosmos DB database account with the provided name.
 *
 * @summary gets the Gremlin graph throughput under an existing Azure Cosmos DB database account with the provided name.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBGremlinGraphThroughputGet.json
 */
async function cosmosDBGremlinGraphThroughputGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.gremlinResources.getGremlinGraphThroughput(
    "rg1",
    "ddb1",
    "databaseName",
    "graphName",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDBGremlinGraphThroughputGet();
}

main().catch(console.error);
