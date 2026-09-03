// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBForPostgreSQL } from "@azure/arm-cosmosdbforpostgresql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a cluster together with servers in it.
 *
 * @summary deletes a cluster together with servers in it.
 * x-ms-original-file: 2023-03-02-preview/ClusterDelete.json
 */
async function deleteTheCluster(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new CosmosDBForPostgreSQL(credential, subscriptionId);
  await client.clusters.delete("TestGroup", "testcluster");
}

async function main(): Promise<void> {
  await deleteTheCluster();
}

main().catch(console.error);
