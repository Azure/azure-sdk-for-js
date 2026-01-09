// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Removes an existing Azure Cosmos DB database account from a throughput pool.
 *
 * @summary Removes an existing Azure Cosmos DB database account from a throughput pool.
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/DocumentDB/preview/2025-11-01-preview/examples/throughputPool/CosmosDBThroughputPoolAccountDelete.json
 */
async function cosmosDbThroughputPoolAccountDelete() {
  const subscriptionId =
    process.env["COSMOSDB_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["COSMOSDB_RESOURCE_GROUP"] || "rgName";
  const throughputPoolName = "tp1";
  const throughputPoolAccountName = "db1";
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.throughputPoolAccount.beginDeleteAndWait(
    resourceGroupName,
    throughputPoolName,
    throughputPoolAccountName,
  );
  console.log(result);
}

async function main() {
  await cosmosDbThroughputPoolAccountDelete();
}

main().catch(console.error);
