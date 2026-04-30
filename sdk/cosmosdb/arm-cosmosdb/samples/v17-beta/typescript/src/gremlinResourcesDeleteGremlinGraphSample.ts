// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes an existing Azure Cosmos DB Gremlin graph.
 *
 * @summary deletes an existing Azure Cosmos DB Gremlin graph.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBGremlinGraphDelete.json
 */
async function cosmosDBGremlinGraphDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  await client.gremlinResources.deleteGremlinGraph("rg1", "ddb1", "databaseName", "graphName");
}

async function main(): Promise<void> {
  await cosmosDBGremlinGraphDelete();
}

main().catch(console.error);
