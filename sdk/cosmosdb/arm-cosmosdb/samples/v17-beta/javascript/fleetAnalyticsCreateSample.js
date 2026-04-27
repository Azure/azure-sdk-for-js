// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates an Azure Cosmos DB FleetAnalytics under a fleet.
 *
 * @summary creates an Azure Cosmos DB FleetAnalytics under a fleet.
 * x-ms-original-file: 2025-11-01-preview/fleet/CosmosDBFleetAnalyticsCreate.json
 */
async function cosmosDBFleetAnalyticsCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.fleetAnalytics.create("rg1", "fleet1", "storageAccount", {
    storageLocationType: "StorageAccount",
    storageLocationUri:
      "/subscriptions/d1eb41bc-1b7f-4404-bd2a-868c222852d/resourceGroups/rg1/providers/Microsoft.Storage/storageAccounts/testStorageAccount1",
  });
  console.log(result);
}

async function main() {
  await cosmosDBFleetAnalyticsCreate();
}

main().catch(console.error);
