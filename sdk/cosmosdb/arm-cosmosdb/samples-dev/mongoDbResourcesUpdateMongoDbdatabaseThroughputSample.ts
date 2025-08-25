// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Update RUs per second of the an Azure Cosmos DB MongoDB database
 *
 * @summary Update RUs per second of the an Azure Cosmos DB MongoDB database
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/stable/2025-04-15/examples/CosmosDBMongoDBDatabaseThroughputUpdate.json
 */

import {
  ThroughputSettingsUpdateParameters,
  CosmosDBManagementClient,
} from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function cosmosDbMongoDbdatabaseThroughputUpdate(): Promise<void> {
  const subscriptionId = process.env["COSMOSDB_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["COSMOSDB_RESOURCE_GROUP"] || "rg1";
  const accountName = "ddb1";
  const databaseName = "databaseName";
  const updateThroughputParameters: ThroughputSettingsUpdateParameters = {
    location: "West US",
    resource: { throughput: 400 },
    tags: {},
  };
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result =
    await client.mongoDBResources.beginUpdateMongoDBDatabaseThroughputAndWait(
      resourceGroupName,
      accountName,
      databaseName,
      updateThroughputParameters,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDbMongoDbdatabaseThroughputUpdate();
}

main().catch(console.error);
