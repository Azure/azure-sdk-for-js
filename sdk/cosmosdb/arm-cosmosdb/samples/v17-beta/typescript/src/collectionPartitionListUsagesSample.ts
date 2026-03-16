// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieves the usages (most recent storage data) for the given collection, split by partition.
 *
 * @summary retrieves the usages (most recent storage data) for the given collection, split by partition.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBCollectionPartitionGetUsages.json
 */
async function cosmosDBCollectionGetUsages(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.collectionPartition.listUsages(
    "rg1",
    "ddb1",
    "databaseRid",
    "collectionRid",
    { filter: "$filter=name.value eq 'Partition Storage'" },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await cosmosDBCollectionGetUsages();
}

main().catch(console.error);
