// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  GremlinDatabaseCreateUpdateParameters} from "@azure/arm-cosmosdb";
import {
  CosmosDBManagementClient,
} from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Create or update an Azure Cosmos DB Gremlin database
 *
 * @summary Create or update an Azure Cosmos DB Gremlin database
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/DocumentDB/preview/2025-11-01-preview/examples/CosmosDBGremlinDatabaseCreateUpdate.json
 */
async function cosmosDbGremlinDatabaseCreateUpdate(): Promise<void> {
  const subscriptionId = process.env["COSMOSDB_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["COSMOSDB_RESOURCE_GROUP"] || "rg1";
  const accountName = "ddb1";
  const databaseName = "databaseName";
  const createUpdateGremlinDatabaseParameters: GremlinDatabaseCreateUpdateParameters =
    {
      location: "West US",
      options: {},
      resource: { id: "databaseName" },
      tags: {},
    };
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result =
    await client.gremlinResources.beginCreateUpdateGremlinDatabaseAndWait(
      resourceGroupName,
      accountName,
      databaseName,
      createUpdateGremlinDatabaseParameters,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDbGremlinDatabaseCreateUpdate();
}

main().catch(console.error);
