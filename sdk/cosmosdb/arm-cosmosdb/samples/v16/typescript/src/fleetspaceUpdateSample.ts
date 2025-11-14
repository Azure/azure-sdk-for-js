// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  FleetspaceUpdate,
  FleetspaceUpdateOptionalParams} from "@azure/arm-cosmosdb";
import {
  CosmosDBManagementClient,
} from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Update the properties of an existing Azure Cosmos DB fleetspace under a fleet.
 *
 * @summary Update the properties of an existing Azure Cosmos DB fleetspace under a fleet.
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/DocumentDB/stable/2025-10-15/examples/fleet/CosmosDBFleetspaceUpdate.json
 */
async function cosmosDbFleetspaceUpdate(): Promise<void> {
  const subscriptionId =
    process.env["COSMOSDB_SUBSCRIPTION_ID"] ||
    "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["COSMOSDB_RESOURCE_GROUP"] || "rg1";
  const fleetName = "fleet1";
  const fleetspaceName = "fleetspace1";
  const body: FleetspaceUpdate = {
    dataRegions: ["westus2"],
    fleetspaceApiKind: "NoSQL",
    throughputPoolConfiguration: { maxThroughput: 4000, minThroughput: 3000 },
  };
  const options: FleetspaceUpdateOptionalParams = { body };
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.fleetspace.beginUpdateAndWait(
    resourceGroupName,
    fleetName,
    fleetspaceName,
    options,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDbFleetspaceUpdate();
}

main().catch(console.error);
