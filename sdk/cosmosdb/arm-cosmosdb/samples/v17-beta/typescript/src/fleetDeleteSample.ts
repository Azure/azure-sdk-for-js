// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes an existing Azure Cosmos DB Fleet.
 *
 * @summary deletes an existing Azure Cosmos DB Fleet.
 * x-ms-original-file: 2025-11-01-preview/fleet/CosmosDBFleetDelete.json
 */
async function cosmosDBFleetDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  await client.fleet.delete("rg1", "fleet1");
}

async function main(): Promise<void> {
  await cosmosDBFleetDelete();
}

main().catch(console.error);
