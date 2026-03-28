// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieves metric definitions for the given collection.
 *
 * @summary retrieves metric definitions for the given collection.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBCollectionGetMetricDefinitions.json
 */
async function cosmosDBCollectionGetMetricDefinitions(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.collection.listMetricDefinitions(
    "rg1",
    "ddb1",
    "databaseRid",
    "collectionRid",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await cosmosDBCollectionGetMetricDefinitions();
}

main().catch(console.error);
