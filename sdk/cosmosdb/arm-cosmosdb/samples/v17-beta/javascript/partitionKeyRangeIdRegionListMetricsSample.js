// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieves the metrics determined by the given filter for the given partition key range id and region.
 *
 * @summary retrieves the metrics determined by the given filter for the given partition key range id and region.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBPKeyRangeIdRegionGetMetrics.json
 */
async function cosmosDBDatabaseAccountRegionGetMetrics() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.partitionKeyRangeIdRegion.listMetrics(
    "rg1",
    "ddb1",
    "West US",
    "databaseRid",
    "collectionRid",
    "0",
    "$filter=(name.value eq 'Max RUs Per Second') and timeGrain eq duration'PT1M' and startTime eq '2017-11-19T23:53:55.2780000Z' and endTime eq '2017-11-20T23:58:55.2780000Z",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await cosmosDBDatabaseAccountRegionGetMetrics();
}

main().catch(console.error);
