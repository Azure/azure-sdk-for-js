// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to restores a soft-deleted Azure Cosmos DB SQL container to active state.
 *
 * @summary restores a soft-deleted Azure Cosmos DB SQL container to active state.
 * x-ms-original-file: 2026-04-01-preview/CosmosDBSoftDeletedSqlContainerRestore.json
 */
async function cosmosDBSoftDeletedSqlContainerRestore(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  await client.softDeletedSqlContainers.restore(
    "rg1",
    "West US",
    "softdeleted-cosmosdb-1",
    "MyDatabase",
    "MyContainer",
  );
}

async function main(): Promise<void> {
  await cosmosDBSoftDeletedSqlContainerRestore();
}

main().catch(console.error);
