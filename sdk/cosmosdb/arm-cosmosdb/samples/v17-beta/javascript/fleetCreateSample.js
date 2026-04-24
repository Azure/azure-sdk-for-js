// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates an Azure Cosmos DB fleet under a subscription.
 *
 * @summary creates an Azure Cosmos DB fleet under a subscription.
 * x-ms-original-file: 2025-11-01-preview/fleet/CosmosDBFleetCreate.json
 */
async function cosmosDBFleetCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.fleet.create("rg1", "fleet1", {
    location: "West US",
    tags: { Dept: "Finance", Environment: "Production" },
  });
  console.log(result);
}

async function main() {
  await cosmosDBFleetCreate();
}

main().catch(console.error);
