// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieves the metrics determined by the given filter for the given collection, split by partition.
 *
 * @summary retrieves the metrics determined by the given filter for the given collection, split by partition.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBCollectionPartitionGetMetrics.json
 */
async function cosmosDBDatabaseAccountRegionGetMetrics(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.collectionPartition.listMetrics(
    "rg1",
    "ddb1",
    "databaseRid",
    "collectionRid",
    "$filter=(name.value eq 'Max RUs Per Second') and timeGrain eq duration'PT1M' and startTime eq '2017-11-19T23:53:55.2780000Z' and endTime eq '2017-11-20T23:58:55.2780000Z",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await cosmosDBDatabaseAccountRegionGetMetrics();
}

main().catch(console.error);
