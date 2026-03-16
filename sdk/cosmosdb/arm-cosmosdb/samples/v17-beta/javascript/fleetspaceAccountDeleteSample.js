// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to removes an existing Azure Cosmos DB fleetspace account from a fleetspace.
 *
 * @summary removes an existing Azure Cosmos DB fleetspace account from a fleetspace.
 * x-ms-original-file: 2025-11-01-preview/fleet/CosmosDBFleetspaceAccountDelete.json
 */
async function cosmosDBFleetspaceAccountDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  await client.fleetspaceAccount.delete("rg1", "fleet1", "fleetspace1", "db1");
}

async function main() {
  await cosmosDBFleetspaceAccountDelete();
}

main().catch(console.error);
