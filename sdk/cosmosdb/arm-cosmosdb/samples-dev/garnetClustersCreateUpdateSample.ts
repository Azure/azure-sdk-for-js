// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update a Garnet cache cluster. When updating, you must specify all writable properties.
 *
 * @summary create or update a Garnet cache cluster. When updating, you must specify all writable properties.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBGarnetClusterCreate.json
 */
async function cosmosDBGarnetClusterCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.garnetClusters.createUpdate("garnet-prod-rg", "garnet-prod", {
    location: "West US",
    tags: {},
    properties: {
      subnetId:
        "/subscriptions/536e130b-d7d6-4ac7-98a5-de20d69588d2/resourceGroups/customer-vnet-rg/providers/Microsoft.Network/virtualNetworks/customer-vnet/subnets/management",
      nodeCount: 4,
      nodeSku: "Standard_DS13_v2",
      replicationFactor: 2,
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDBGarnetClusterCreate();
}

main().catch(console.error);
