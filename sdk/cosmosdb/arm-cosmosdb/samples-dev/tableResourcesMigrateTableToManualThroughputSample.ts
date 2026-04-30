// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to migrate an Azure Cosmos DB Table from autoscale to manual throughput
 *
 * @summary migrate an Azure Cosmos DB Table from autoscale to manual throughput
 * x-ms-original-file: 2025-11-01-preview/CosmosDBTableMigrateToManualThroughput.json
 */
async function cosmosDBTableMigrateToManualThroughput(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.tableResources.migrateTableToManualThroughput(
    "rg1",
    "ddb1",
    "tableName",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDBTableMigrateToManualThroughput();
}

main().catch(console.error);
