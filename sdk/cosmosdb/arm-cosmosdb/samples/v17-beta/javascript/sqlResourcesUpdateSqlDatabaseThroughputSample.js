// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Update RUs per second of an Azure Cosmos DB SQL database
 *
 * @summary Update RUs per second of an Azure Cosmos DB SQL database
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/DocumentDB/preview/2025-11-01-preview/examples/CosmosDBSqlDatabaseThroughputUpdate.json
 */
async function cosmosDbSqlDatabaseThroughputUpdate() {
  const subscriptionId = process.env["COSMOSDB_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["COSMOSDB_RESOURCE_GROUP"] || "rg1";
  const accountName = "ddb1";
  const databaseName = "databaseName";
  const updateThroughputParameters = {
    location: "West US",
    resource: { throughput: 400 },
    tags: {},
  };
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.sqlResources.beginUpdateSqlDatabaseThroughputAndWait(
    resourceGroupName,
    accountName,
    databaseName,
    updateThroughputParameters,
  );
  console.log(result);
}

async function main() {
  await cosmosDbSqlDatabaseThroughputUpdate();
}

main().catch(console.error);
