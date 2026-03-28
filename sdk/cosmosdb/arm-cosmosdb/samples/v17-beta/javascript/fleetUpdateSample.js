// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates the properties of an existing Azure Cosmos DB Fleet.
 *
 * @summary updates the properties of an existing Azure Cosmos DB Fleet.
 * x-ms-original-file: 2025-11-01-preview/fleet/CosmosDBFleetUpdate.json
 */
async function cosmosDBFleetUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.fleet.update("rg1", "fleet1", { body: {} });
  console.log(result);
}

async function main() {
  await cosmosDBFleetUpdate();
}

main().catch(console.error);
