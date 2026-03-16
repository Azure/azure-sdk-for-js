// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list all Garnet clusters in this subscription.
 *
 * @summary list all Garnet clusters in this subscription.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBGarnetClusterListBySubscription.json
 */
async function cosmosDBGarnetClusterListBySubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.garnetClusters.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await cosmosDBGarnetClusterListBySubscription();
}

main().catch(console.error);
