// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieves the properties of an existing Azure Cosmos DB fleet under a subscription
 *
 * @summary retrieves the properties of an existing Azure Cosmos DB fleet under a subscription
 * x-ms-original-file: 2025-11-01-preview/fleet/CosmosDBFleetGet.json
 */
async function cosmosDBFleetGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.fleet.get("rg1", "fleet1");
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDBFleetGet();
}

main().catch(console.error);
