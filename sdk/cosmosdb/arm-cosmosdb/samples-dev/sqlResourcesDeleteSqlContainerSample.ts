// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes an existing Azure Cosmos DB SQL container.
 *
 * @summary deletes an existing Azure Cosmos DB SQL container.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBSqlContainerDelete.json
 */
async function cosmosDBSqlContainerDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  await client.sqlResources.deleteSqlContainer("rg1", "ddb1", "databaseName", "containerName");
}

async function main(): Promise<void> {
  await cosmosDBSqlContainerDelete();
}

main().catch(console.error);
