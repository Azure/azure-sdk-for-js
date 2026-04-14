// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update an Azure Cosmos DB Graph.
 *
 * @summary create or update an Azure Cosmos DB Graph.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBGraphResourceCreateUpdate.json
 */
async function cosmosDBGraphCreateUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.graphResources.createUpdateGraph("rg1", "ddb1", "graphName", {
    location: "West US",
    options: {},
    resource: { id: "graphName" },
    tags: {},
  });
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDBGraphCreateUpdate();
}

main().catch(console.error);
