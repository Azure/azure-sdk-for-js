// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieves the metrics determined by the given filter for the given account, source and target region. This url is only for PBS and Replication Latency data
 *
 * @summary retrieves the metrics determined by the given filter for the given account, source and target region. This url is only for PBS and Replication Latency data
 * x-ms-original-file: 2025-11-01-preview/CosmosDBPercentileSourceTargetGetMetrics.json
 */
async function cosmosDBDatabaseAccountRegionGetMetrics(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.percentileSourceTarget.listMetrics(
    "rg1",
    "ddb1",
    "West Central US",
    "East US",
    "$filter=(name.value eq 'Probabilistic Bounded Staleness') and timeGrain eq duration'PT5M' and startTime eq '2017-11-19T23:53:55.2780000Z' and endTime eq '2017-11-20T00:13:55.2780000Z",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await cosmosDBDatabaseAccountRegionGetMetrics();
}

main().catch(console.error);
