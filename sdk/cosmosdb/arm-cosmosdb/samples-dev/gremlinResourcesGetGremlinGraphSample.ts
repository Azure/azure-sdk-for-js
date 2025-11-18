// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets the Gremlin graph under an existing Azure Cosmos DB database account.
 *
 * @summary Gets the Gremlin graph under an existing Azure Cosmos DB database account.
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/DocumentDB/stable/2025-10-15/examples/CosmosDBGremlinGraphGet.json
 */
async function cosmosDbGremlinGraphGet(): Promise<void> {
  const subscriptionId = process.env["COSMOSDB_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["COSMOSDB_RESOURCE_GROUP"] || "rgName";
  const accountName = "ddb1";
  const databaseName = "databaseName";
  const graphName = "graphName";
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.gremlinResources.getGremlinGraph(
    resourceGroupName,
    accountName,
    databaseName,
    graphName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDbGremlinGraphGet();
}

main().catch(console.error);
