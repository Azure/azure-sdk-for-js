// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Removes an existing Azure Cosmos DB fleetspace account from a fleetspace.
 *
 * @summary Removes an existing Azure Cosmos DB fleetspace account from a fleetspace.
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/DocumentDB/preview/2025-11-01-preview/examples/fleet/CosmosDBFleetspaceAccountDelete.json
 */
async function cosmosDbFleetspaceAccountDelete(): Promise<void> {
  const subscriptionId =
    process.env["COSMOSDB_SUBSCRIPTION_ID"] ||
    "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["COSMOSDB_RESOURCE_GROUP"] || "rg1";
  const fleetName = "fleet1";
  const fleetspaceName = "fleetspace1";
  const fleetspaceAccountName = "db1";
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.fleetspaceAccount.beginDeleteAndWait(
    resourceGroupName,
    fleetName,
    fleetspaceName,
    fleetspaceAccountName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDbFleetspaceAccountDelete();
}

main().catch(console.error);
