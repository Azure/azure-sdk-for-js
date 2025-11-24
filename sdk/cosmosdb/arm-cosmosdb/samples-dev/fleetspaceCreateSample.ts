// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  FleetspaceResource} from "@azure/arm-cosmosdb";
import {
  CosmosDBManagementClient,
} from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates an Azure Cosmos DB fleetspace under a fleet.
 *
 * @summary Creates an Azure Cosmos DB fleetspace under a fleet.
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/DocumentDB/preview/2025-11-01-preview/examples/fleet/CosmosDBFleetspaceCreate.json
 */
async function cosmosDbFleetspaceCreate(): Promise<void> {
  const subscriptionId =
    process.env["COSMOSDB_SUBSCRIPTION_ID"] ||
    "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["COSMOSDB_RESOURCE_GROUP"] || "rg1";
  const fleetName = "fleet1";
  const fleetspaceName = "fleetspace1";
  const body: FleetspaceResource = {
    dataRegions: ["westus2"],
    fleetspaceApiKind: "NoSQL",
    serviceTier: "GeneralPurpose",
    throughputPoolConfiguration: {
      maxThroughput: 500000,
      minThroughput: 100000,
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.fleetspace.beginCreateAndWait(
    resourceGroupName,
    fleetName,
    fleetspaceName,
    body,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDbFleetspaceCreate();
}

main().catch(console.error);
