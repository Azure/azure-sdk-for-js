// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all the FleetAnalytics under a fleet.
 *
 * @summary lists all the FleetAnalytics under a fleet.
 * x-ms-original-file: 2025-11-01-preview/fleet/CosmosDBFleetAnalyticsList.json
 */
async function cosmosDBFleetAnalyticsList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.fleetAnalytics.list("rg1", "fleet1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await cosmosDBFleetAnalyticsList();
}

main().catch(console.error);
