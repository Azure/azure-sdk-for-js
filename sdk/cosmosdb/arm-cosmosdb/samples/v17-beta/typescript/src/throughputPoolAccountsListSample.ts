// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all the Azure Cosmos DB accounts available under the subscription.
 *
 * @summary lists all the Azure Cosmos DB accounts available under the subscription.
 * x-ms-original-file: 2025-11-01-preview/throughputPool/CosmosDBThroughputPoolAccountsList.json
 */
async function cosmosDBThroughputPoolAccountList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.throughputPoolAccounts.list("rgName", "tp1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await cosmosDBThroughputPoolAccountList();
}

main().catch(console.error);
