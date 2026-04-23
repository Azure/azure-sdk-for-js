// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all the Azure Cosmos DB Throughput Pools available under the subscription.
 *
 * @summary lists all the Azure Cosmos DB Throughput Pools available under the subscription.
 * x-ms-original-file: 2025-11-01-preview/throughputPool/CosmosDBThroughputPoolList.json
 */
async function cosmosDBThroughputPoolList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.throughputPools.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await cosmosDBThroughputPoolList();
}

main().catch(console.error);
