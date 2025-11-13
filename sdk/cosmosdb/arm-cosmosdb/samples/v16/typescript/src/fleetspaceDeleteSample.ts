// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Deletes an existing Azure Cosmos DB Fleetspace.
 *
 * @summary Deletes an existing Azure Cosmos DB Fleetspace.
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/DocumentDB/stable/2025-10-15/examples/fleet/CosmosDBFleetspaceDelete.json
 */
async function cosmosDbFleetspaceDelete(): Promise<void> {
  const subscriptionId =
    process.env["COSMOSDB_SUBSCRIPTION_ID"] ||
    "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["COSMOSDB_RESOURCE_GROUP"] || "rg1";
  const fleetName = "fleet1";
  const fleetspaceName = "fleetspace1";
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.fleetspace.beginDeleteAndWait(
    resourceGroupName,
    fleetName,
    fleetspaceName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDbFleetspaceDelete();
}

main().catch(console.error);
