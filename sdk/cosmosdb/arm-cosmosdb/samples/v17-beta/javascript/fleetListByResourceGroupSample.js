// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all the fleets under the specified subscription and resource group.
 *
 * @summary lists all the fleets under the specified subscription and resource group.
 * x-ms-original-file: 2025-11-01-preview/fleet/CosmosDBFleetList_ListByResourceGroup.json
 */
async function cosmosDBFleetListByResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.fleet.listByResourceGroup("rg1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await cosmosDBFleetListByResourceGroup();
}

main().catch(console.error);
