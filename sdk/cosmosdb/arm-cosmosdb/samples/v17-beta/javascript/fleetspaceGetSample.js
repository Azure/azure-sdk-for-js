// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieves the properties of an existing Azure Cosmos DB fleetspace under a fleet
 *
 * @summary retrieves the properties of an existing Azure Cosmos DB fleetspace under a fleet
 * x-ms-original-file: 2025-11-01-preview/fleet/CosmosDBFleetspaceGet.json
 */
async function cosmosDBFleetspaceGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.fleetspace.get("rg1", "fleet1", "fleetspace1");
  console.log(result);
}

async function main() {
  await cosmosDBFleetspaceGet();
}

main().catch(console.error);
