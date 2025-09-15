// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Update RUs per second of an Azure Cosmos DB Gremlin graph
 *
 * @summary Update RUs per second of an Azure Cosmos DB Gremlin graph
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/stable/2025-04-15/examples/CosmosDBGremlinGraphThroughputUpdate.json
 */

import {
  ThroughputSettingsUpdateParameters,
  CosmosDBManagementClient,
} from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function cosmosDbGremlinGraphThroughputUpdate(): Promise<void> {
  const subscriptionId = process.env["COSMOSDB_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["COSMOSDB_RESOURCE_GROUP"] || "rg1";
  const accountName = "ddb1";
  const databaseName = "databaseName";
  const graphName = "graphName";
  const updateThroughputParameters: ThroughputSettingsUpdateParameters = {
    location: "West US",
    resource: { throughput: 400 },
    tags: {},
  };
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result =
    await client.gremlinResources.beginUpdateGremlinGraphThroughputAndWait(
      resourceGroupName,
      accountName,
      databaseName,
      graphName,
      updateThroughputParameters,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDbGremlinGraphThroughputUpdate();
}

main().catch(console.error);
