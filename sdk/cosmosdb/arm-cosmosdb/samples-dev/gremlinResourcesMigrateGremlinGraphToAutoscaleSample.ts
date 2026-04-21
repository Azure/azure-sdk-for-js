// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to migrate an Azure Cosmos DB Gremlin graph from manual throughput to autoscale
 *
 * @summary migrate an Azure Cosmos DB Gremlin graph from manual throughput to autoscale
 * x-ms-original-file: 2025-11-01-preview/CosmosDBGremlinGraphMigrateToAutoscale.json
 */
async function cosmosDBGremlinGraphMigrateToAutoscale(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.gremlinResources.migrateGremlinGraphToAutoscale(
    "rg1",
    "ddb1",
    "databaseName",
    "graphName",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDBGremlinGraphMigrateToAutoscale();
}

main().catch(console.error);
