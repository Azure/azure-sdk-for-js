// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the properties of an existing Cosmos DB location
 *
 * @summary get the properties of an existing Cosmos DB location
 * x-ms-original-file: 2025-11-01-preview/CosmosDBLocationGet.json
 */
async function cosmosDBLocationGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.locations.get("westus");
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDBLocationGet();
}

main().catch(console.error);
