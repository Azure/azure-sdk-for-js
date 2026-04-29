// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieves the metrics determined by the given filter for the given database account. This url is only for PBS and Replication Latency data
 *
 * @summary retrieves the metrics determined by the given filter for the given database account. This url is only for PBS and Replication Latency data
 * x-ms-original-file: 2025-11-01-preview/CosmosDBPercentileGetMetrics.json
 */
async function cosmosDBDatabaseAccountRegionGetMetrics() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.percentile.listMetrics(
    "rg1",
    "ddb1",
    "$filter=(name.value eq 'Probabilistic Bounded Staleness') and timeGrain eq duration'PT5M' and startTime eq '2017-11-19T23:53:55.2780000Z' and endTime eq '2017-11-20T00:13:55.2780000Z",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await cosmosDBDatabaseAccountRegionGetMetrics();
}

main().catch(console.error);
