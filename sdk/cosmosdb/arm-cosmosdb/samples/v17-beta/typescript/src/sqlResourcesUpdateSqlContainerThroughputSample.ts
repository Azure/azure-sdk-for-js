// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update RUs per second of an Azure Cosmos DB SQL container
 *
 * @summary update RUs per second of an Azure Cosmos DB SQL container
 * x-ms-original-file: 2025-11-01-preview/CosmosDBSqlContainerThroughputUpdate.json
 */
async function cosmosDBSqlContainerThroughputUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.sqlResources.updateSqlContainerThroughput(
    "rg1",
    "ddb1",
    "databaseName",
    "containerName",
    { location: "West US", tags: {}, resource: { throughput: 400 } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDBSqlContainerThroughputUpdate();
}

main().catch(console.error);
