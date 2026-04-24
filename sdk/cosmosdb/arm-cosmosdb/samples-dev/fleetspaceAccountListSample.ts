// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all the fleetspaces accounts  under a fleetspace.
 *
 * @summary lists all the fleetspaces accounts  under a fleetspace.
 * x-ms-original-file: 2025-11-01-preview/fleet/CosmosDBFleetspaceAccountList.json
 */
async function cosmosDBFleetspaceAccountList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.fleetspaceAccount.list("rg1", "fleet1", "fleetspace1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await cosmosDBFleetspaceAccountList();
}

main().catch(console.error);
