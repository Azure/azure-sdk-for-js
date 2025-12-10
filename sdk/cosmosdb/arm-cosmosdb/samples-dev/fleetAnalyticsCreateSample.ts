// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  FleetAnalyticsResource} from "@azure/arm-cosmosdb";
import {
  CosmosDBManagementClient,
} from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates an Azure Cosmos DB FleetAnalytics under a fleet.
 *
 * @summary Creates an Azure Cosmos DB FleetAnalytics under a fleet.
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/DocumentDB/preview/2025-11-01-preview/examples/fleet/CosmosDBFleetAnalyticsCreate.json
 */
async function cosmosDbFleetAnalyticsCreate(): Promise<void> {
  const subscriptionId =
    process.env["COSMOSDB_SUBSCRIPTION_ID"] ||
    "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["COSMOSDB_RESOURCE_GROUP"] || "rg1";
  const fleetName = "fleet1";
  const fleetAnalyticsName = "storageAccount";
  const body: FleetAnalyticsResource = {
    storageLocationType: "StorageAccount",
    storageLocationUri:
      "/subscriptions/d1eb41bc-1b7f-4404-bd2a-868c222852d/resourceGroups/rg1/providers/Microsoft.Storage/storageAccounts/testStorageAccount1",
  };
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.fleetAnalytics.create(
    resourceGroupName,
    fleetName,
    fleetAnalyticsName,
    body,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDbFleetAnalyticsCreate();
}

main().catch(console.error);
