// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Migrate an Azure Cosmos DB Gremlin graph from manual throughput to autoscale
 *
 * @summary Migrate an Azure Cosmos DB Gremlin graph from manual throughput to autoscale
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/stable/2025-04-15/examples/CosmosDBGremlinGraphMigrateToAutoscale.json
 */

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function cosmosDbGremlinGraphMigrateToAutoscale(): Promise<void> {
  const subscriptionId = process.env["COSMOSDB_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["COSMOSDB_RESOURCE_GROUP"] || "rg1";
  const accountName = "ddb1";
  const databaseName = "databaseName";
  const graphName = "graphName";
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result =
    await client.gremlinResources.beginMigrateGremlinGraphToAutoscaleAndWait(
      resourceGroupName,
      accountName,
      databaseName,
      graphName,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDbGremlinGraphMigrateToAutoscale();
}

main().catch(console.error);
