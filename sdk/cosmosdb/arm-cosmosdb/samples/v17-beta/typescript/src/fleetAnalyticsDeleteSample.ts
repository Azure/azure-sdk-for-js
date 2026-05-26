// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes an existing Azure Cosmos DB FleetAnalytics.
 *
 * @summary deletes an existing Azure Cosmos DB FleetAnalytics.
 * x-ms-original-file: 2025-11-01-preview/fleet/CosmosDBFleetAnalyticsDelete.json
 */
async function cosmosDBFleetAnalyticsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  await client.fleetAnalytics.delete("rg1", "fleet1", "storageAccount");
}

async function main(): Promise<void> {
  await cosmosDBFleetAnalyticsDelete();
}

main().catch(console.error);
