// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates the properties of an existing Azure Cosmos DB Fleet.
 *
 * @summary updates the properties of an existing Azure Cosmos DB Fleet.
 * x-ms-original-file: 2025-11-01-preview/fleet/CosmosDBFleetUpdate.json
 */
async function cosmosDBFleetUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.fleet.update("rg1", "fleet1", { body: {} });
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDBFleetUpdate();
}

main().catch(console.error);
