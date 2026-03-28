// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes an existing Azure Cosmos DB Fleet.
 *
 * @summary deletes an existing Azure Cosmos DB Fleet.
 * x-ms-original-file: 2025-11-01-preview/fleet/CosmosDBFleetDelete.json
 */
async function cosmosDBFleetDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  await client.fleet.delete("rg1", "fleet1");
}

async function main() {
  await cosmosDBFleetDelete();
}

main().catch(console.error);
