// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Retrieves the properties of an existing Azure Cosmos DB Throughput Pool
 *
 * @summary Retrieves the properties of an existing Azure Cosmos DB Throughput Pool
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/DocumentDB/preview/2025-11-01-preview/examples/throughputPool/CosmosDBThroughputPoolAccountGet.json
 */
async function cosmosDbThroughputPoolAccountGet() {
  const subscriptionId =
    process.env["COSMOSDB_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["COSMOSDB_RESOURCE_GROUP"] || "rgName";
  const throughputPoolName = "tp1";
  const throughputPoolAccountName = "db1";
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.throughputPoolAccount.get(
    resourceGroupName,
    throughputPoolName,
    throughputPoolAccountName,
  );
  console.log(result);
}

async function main() {
  await cosmosDbThroughputPoolAccountGet();
}

main().catch(console.error);
