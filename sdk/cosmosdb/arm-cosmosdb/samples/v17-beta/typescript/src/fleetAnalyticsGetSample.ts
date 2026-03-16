// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieves the properties of an existing Azure Cosmos DB FleetAnalytics under a fleet
 *
 * @summary retrieves the properties of an existing Azure Cosmos DB FleetAnalytics under a fleet
 * x-ms-original-file: 2025-11-01-preview/fleet/CosmosDBFleetAnalyticsGet.json
 */
async function cosmosDBFleetAnalyticsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.fleetAnalytics.get("rg1", "fleet1", "storageAccount");
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDBFleetAnalyticsGet();
}

main().catch(console.error);
