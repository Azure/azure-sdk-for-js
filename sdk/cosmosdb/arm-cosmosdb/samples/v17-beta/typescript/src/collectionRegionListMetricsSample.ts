// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieves the metrics determined by the given filter for the given database account, collection and region.
 *
 * @summary retrieves the metrics determined by the given filter for the given database account, collection and region.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBRegionCollectionGetMetrics.json
 */
async function cosmosDBRegionCollectionGetMetrics(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.collectionRegion.listMetrics(
    "rg1",
    "ddb1",
    "North Europe",
    "databaseRid",
    "collectionRid",
    "$filter=(name.value eq 'Total Requests') and timeGrain eq duration'PT5M' and startTime eq '2017-11-19T23:53:55.2780000Z' and endTime eq '2017-11-20T00:13:55.2780000Z",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await cosmosDBRegionCollectionGetMetrics();
}

main().catch(console.error);
