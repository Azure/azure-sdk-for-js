// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Migrate an Azure Cosmos DB MongoDB database from manual throughput to autoscale
 *
 * @summary Migrate an Azure Cosmos DB MongoDB database from manual throughput to autoscale
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/stable/2025-04-15/examples/CosmosDBMongoDBDatabaseMigrateToAutoscale.json
 */

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function cosmosDbMongoDbdatabaseMigrateToAutoscale(): Promise<void> {
  const subscriptionId = process.env["COSMOSDB_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["COSMOSDB_RESOURCE_GROUP"] || "rg1";
  const accountName = "ddb1";
  const databaseName = "databaseName";
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result =
    await client.mongoDBResources.beginMigrateMongoDBDatabaseToAutoscaleAndWait(
      resourceGroupName,
      accountName,
      databaseName,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDbMongoDbdatabaseMigrateToAutoscale();
}

main().catch(console.error);
