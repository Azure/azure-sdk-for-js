// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates an Azure Cosmos DB fleetspace account under a fleetspace.
 *
 * @summary creates an Azure Cosmos DB fleetspace account under a fleetspace.
 * x-ms-original-file: 2025-11-01-preview/fleet/CosmosDBFleetspaceAccountCreate.json
 */
async function cosmosDBFleetspaceAccountCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.fleetspaceAccount.create("rg1", "fleet1", "fleetspace1", "db1", {
    globalDatabaseAccountProperties: {
      armLocation: "West US",
      resourceId:
        "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/providers/Microsoft.DocumentDB/resourceGroup/rg1/databaseAccounts/db1",
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDBFleetspaceAccountCreate();
}

main().catch(console.error);
