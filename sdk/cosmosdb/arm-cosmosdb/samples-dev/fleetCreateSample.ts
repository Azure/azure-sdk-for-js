// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { FleetResource} from "@azure/arm-cosmosdb";
import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates an Azure Cosmos DB fleet under a subscription.
 *
 * @summary Creates an Azure Cosmos DB fleet under a subscription.
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/DocumentDB/preview/2025-11-01-preview/examples/fleet/CosmosDBFleetCreate.json
 */
async function cosmosDbFleetCreate(): Promise<void> {
  const subscriptionId =
    process.env["COSMOSDB_SUBSCRIPTION_ID"] ||
    "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["COSMOSDB_RESOURCE_GROUP"] || "rg1";
  const fleetName = "fleet1";
  const body: FleetResource = {
    location: "West US",
    tags: { dept: "Finance", environment: "Production" },
  };
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.fleet.create(resourceGroupName, fleetName, body);
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDbFleetCreate();
}

main().catch(console.error);
