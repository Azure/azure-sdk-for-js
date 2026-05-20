// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the Tables under an existing Azure Cosmos DB database account with the provided name.
 *
 * @summary gets the Tables under an existing Azure Cosmos DB database account with the provided name.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBTableGet.json
 */
async function cosmosDBTableGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.tableResources.getTable("rg1", "ddb1", "tableName");
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDBTableGet();
}

main().catch(console.error);
