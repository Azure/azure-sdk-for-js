// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update the properties of an existing Azure Cosmos DB fleetspace under a fleet.
 *
 * @summary update the properties of an existing Azure Cosmos DB fleetspace under a fleet.
 * x-ms-original-file: 2025-11-01-preview/fleet/CosmosDBFleetspaceUpdate.json
 */
async function cosmosDBFleetspaceUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.fleetspace.update("rg1", "fleet1", "fleetspace1", {
    body: {
      fleetspaceApiKind: "NoSQL",
      throughputPoolConfiguration: { minThroughput: 100000, maxThroughput: 1000000 },
    },
  });
  console.log(result);
}

async function main() {
  await cosmosDBFleetspaceUpdate();
}

main().catch(console.error);
