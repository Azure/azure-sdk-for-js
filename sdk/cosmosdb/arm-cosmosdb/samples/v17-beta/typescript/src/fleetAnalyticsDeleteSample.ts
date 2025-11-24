// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Deletes an existing Azure Cosmos DB FleetAnalytics.
 *
 * @summary Deletes an existing Azure Cosmos DB FleetAnalytics.
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/DocumentDB/preview/2025-11-01-preview/examples/fleet/CosmosDBFleetAnalyticsDelete.json
 */
async function cosmosDbFleetAnalyticsDelete(): Promise<void> {
  const subscriptionId =
    process.env["COSMOSDB_SUBSCRIPTION_ID"] ||
    "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["COSMOSDB_RESOURCE_GROUP"] || "rg1";
  const fleetName = "fleet1";
  const fleetAnalyticsName = "storageAccount";
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.fleetAnalytics.beginDeleteAndWait(
    resourceGroupName,
    fleetName,
    fleetAnalyticsName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDbFleetAnalyticsDelete();
}

main().catch(console.error);
