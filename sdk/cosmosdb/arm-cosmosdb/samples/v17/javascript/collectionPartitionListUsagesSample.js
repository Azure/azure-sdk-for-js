// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieves the usages (most recent storage data) for the given collection, split by partition.
 *
 * @summary retrieves the usages (most recent storage data) for the given collection, split by partition.
 * x-ms-original-file: 2026-03-15/CosmosDBCollectionPartitionGetUsages.json
 */
async function cosmosDBCollectionPartitionGetUsages() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.collectionPartition.listUsages(
    "rg1",
    "ddb1",
    "databaseRid",
    "collectionRid",
    { filter: "name.value eq 'Partition Storage'" },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await cosmosDBCollectionPartitionGetUsages();
}

main().catch(console.error);
