// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes an existing Azure Cosmos DB Fleetspace.
 *
 * @summary deletes an existing Azure Cosmos DB Fleetspace.
 * x-ms-original-file: 2025-11-01-preview/fleet/CosmosDBFleetspaceDelete.json
 */
async function cosmosDBFleetspaceDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  await client.fleetspace.delete("rg1", "fleet1", "fleetspace1");
}

async function main(): Promise<void> {
  await cosmosDBFleetspaceDelete();
}

main().catch(console.error);
