// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to merges the partitions of a SQL Container
 *
 * @summary merges the partitions of a SQL Container
 * x-ms-original-file: 2025-11-01-preview/CosmosDBSqlContainerPartitionMerge.json
 */
async function cosmosDBSqlContainerPartitionMerge(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.sqlResources.listSqlContainerPartitionMerge(
    "rgName",
    "ddb1",
    "databaseName",
    "containerName",
    { isDryRun: false },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDBSqlContainerPartitionMerge();
}

main().catch(console.error);
