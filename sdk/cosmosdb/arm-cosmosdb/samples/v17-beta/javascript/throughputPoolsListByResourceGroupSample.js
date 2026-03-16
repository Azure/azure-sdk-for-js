// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all the ThroughputPools in a given resource group.
 *
 * @summary list all the ThroughputPools in a given resource group.
 * x-ms-original-file: 2025-11-01-preview/throughputPool/CosmosDBThroughputPoolList_ListByResourceGroup.json
 */
async function cosmosDBThroughputPoolListByResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.throughputPools.listByResourceGroup("rgName")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await cosmosDBThroughputPoolListByResourceGroup();
}

main().catch(console.error);
