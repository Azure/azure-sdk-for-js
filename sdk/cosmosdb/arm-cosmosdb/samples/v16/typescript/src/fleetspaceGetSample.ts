// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Retrieves the properties of an existing Azure Cosmos DB fleetspace under a fleet
 *
 * @summary Retrieves the properties of an existing Azure Cosmos DB fleetspace under a fleet
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/DocumentDB/stable/2025-10-15/examples/fleet/CosmosDBFleetspaceGet.json
 */
async function cosmosDbFleetspaceGet(): Promise<void> {
  const subscriptionId =
    process.env["COSMOSDB_SUBSCRIPTION_ID"] ||
    "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["COSMOSDB_RESOURCE_GROUP"] || "rg1";
  const fleetName = "fleet1";
  const fleetspaceName = "fleetspace1";
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.fleetspace.get(
    resourceGroupName,
    fleetName,
    fleetspaceName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDbFleetspaceGet();
}

main().catch(console.error);
