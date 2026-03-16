// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates an Azure Cosmos DB fleetspace under a fleet.
 *
 * @summary creates an Azure Cosmos DB fleetspace under a fleet.
 * x-ms-original-file: 2025-11-01-preview/fleet/CosmosDBFleetspaceCreate.json
 */
async function cosmosDBFleetspaceCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.fleetspace.create("rg1", "fleet1", "fleetspace1", {
    fleetspaceApiKind: "NoSQL",
    serviceTier: "GeneralPurpose",
    dataRegions: ["westus2"],
    throughputPoolConfiguration: { minThroughput: 100000, maxThroughput: 500000 },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDBFleetspaceCreate();
}

main().catch(console.error);
