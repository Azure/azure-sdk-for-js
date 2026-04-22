// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieves the properties of an existing Azure Cosmos DB fleetspace account under a fleetspace
 *
 * @summary retrieves the properties of an existing Azure Cosmos DB fleetspace account under a fleetspace
 * x-ms-original-file: 2025-11-01-preview/fleet/CosmosDBFleetspaceAccountGet.json
 */
async function cosmosDBFleetspaceAccountGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.fleetspaceAccount.get("rg1", "fleet1", "fleetspace1", "db1");
  console.log(result);
}

async function main() {
  await cosmosDBFleetspaceAccountGet();
}

main().catch(console.error);
