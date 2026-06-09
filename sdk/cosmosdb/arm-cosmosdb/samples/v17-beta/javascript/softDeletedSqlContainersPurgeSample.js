// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to permanently deletes a soft-deleted Azure Cosmos DB SQL container.
 *
 * @summary permanently deletes a soft-deleted Azure Cosmos DB SQL container.
 * x-ms-original-file: 2026-04-01-preview/CosmosDBSoftDeletedSqlContainerPurge.json
 */
async function cosmosDBSoftDeletedSqlContainerPurge() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  await client.softDeletedSqlContainers.purge(
    "rg1",
    "West US",
    "softdeleted-cosmosdb-1",
    "MyDatabase",
    "MyContainer",
  );
}

async function main() {
  await cosmosDBSoftDeletedSqlContainerPurge();
}

main().catch(console.error);
