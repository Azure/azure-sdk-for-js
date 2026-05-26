// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the properties of a Garnet cache cluster.
 *
 * @summary get the properties of a Garnet cache cluster.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBGarnetClusterGet.json
 */
async function cosmosDBGarnetClusterGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.garnetClusters.get("garnet-prod-rg", "garnet-prod");
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDBGarnetClusterGet();
}

main().catch(console.error);
