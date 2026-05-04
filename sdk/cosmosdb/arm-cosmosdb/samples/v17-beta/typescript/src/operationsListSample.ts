// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all of the available Cosmos DB Resource Provider operations.
 *
 * @summary lists all of the available Cosmos DB Resource Provider operations.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBOperationsList.json
 */
async function cosmosDBOperationsList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.operations.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await cosmosDBOperationsList();
}

main().catch(console.error);
