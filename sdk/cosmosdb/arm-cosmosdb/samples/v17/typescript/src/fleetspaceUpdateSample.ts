// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update the properties of an existing Azure Cosmos DB fleetspace under a fleet.
 *
 * @summary update the properties of an existing Azure Cosmos DB fleetspace under a fleet.
 * x-ms-original-file: 2026-03-15/fleet/CosmosDBFleetspaceUpdate.json
 */
async function cosmosDBFleetspaceUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.fleetspace.update("rg1", "fleet1", "fleetspace1", {
    body: {
      fleetspaceApiKind: "NoSQL",
      dataRegions: ["westus2"],
      throughputPoolConfiguration: { minThroughput: 3000, maxThroughput: 4000 },
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDBFleetspaceUpdate();
}

main().catch(console.error);
