// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to List all the ThroughputPools in a given resource group.
 *
 * @summary List all the ThroughputPools in a given resource group.
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/DocumentDB/preview/2025-11-01-preview/examples/throughputPool/CosmosDBThroughputPoolList.json
 */
async function cosmosDbThroughputPoolListByResourceGroup() {
  const subscriptionId =
    process.env["COSMOSDB_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["COSMOSDB_RESOURCE_GROUP"] || "rgName";
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.throughputPools.listByResourceGroup(resourceGroupName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await cosmosDbThroughputPoolListByResourceGroup();
}

main().catch(console.error);
