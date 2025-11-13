// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Migrate an Azure Cosmos DB Table from manual throughput to autoscale
 *
 * @summary Migrate an Azure Cosmos DB Table from manual throughput to autoscale
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/DocumentDB/stable/2025-10-15/examples/CosmosDBTableMigrateToAutoscale.json
 */
async function cosmosDbTableMigrateToAutoscale() {
  const subscriptionId = process.env["COSMOSDB_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["COSMOSDB_RESOURCE_GROUP"] || "rg1";
  const accountName = "ddb1";
  const tableName = "tableName";
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.tableResources.beginMigrateTableToAutoscaleAndWait(
    resourceGroupName,
    accountName,
    tableName,
  );
  console.log(result);
}

async function main() {
  await cosmosDbTableMigrateToAutoscale();
}

main().catch(console.error);
