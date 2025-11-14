// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Migrate an Azure Cosmos DB Table from autoscale to manual throughput
 *
 * @summary Migrate an Azure Cosmos DB Table from autoscale to manual throughput
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/DocumentDB/stable/2025-10-15/examples/CosmosDBTableMigrateToManualThroughput.json
 */
async function cosmosDbTableMigrateToManualThroughput(): Promise<void> {
  const subscriptionId = process.env["COSMOSDB_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["COSMOSDB_RESOURCE_GROUP"] || "rg1";
  const accountName = "ddb1";
  const tableName = "tableName";
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result =
    await client.tableResources.beginMigrateTableToManualThroughputAndWait(
      resourceGroupName,
      accountName,
      tableName,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDbTableMigrateToManualThroughput();
}

main().catch(console.error);
