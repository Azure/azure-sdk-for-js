// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBForPostgreSQL } from "@azure/arm-cosmosdbforpostgresql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to starts stopped compute on all cluster nodes.
 *
 * @summary starts stopped compute on all cluster nodes.
 * x-ms-original-file: 2023-03-02-preview/ClusterStart.json
 */
async function startAllServersInTheCluster(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new CosmosDBForPostgreSQL(credential, subscriptionId);
  await client.clusters.start("TestGroup", "testcluster1");
}

async function main(): Promise<void> {
  await startAllServersInTheCluster();
}

main().catch(console.error);
