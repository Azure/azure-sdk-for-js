// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list all the ThroughputPools in a given resource group.
 *
 * @summary list all the ThroughputPools in a given resource group.
 * x-ms-original-file: 2025-11-01-preview/throughputPool/CosmosDBThroughputPoolList_ListByResourceGroup.json
 */
async function cosmosDBThroughputPoolListByResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.throughputPools.listByResourceGroup("rgName")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await cosmosDBThroughputPoolListByResourceGroup();
}

main().catch(console.error);
