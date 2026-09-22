// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBForPostgreSQL } from "@azure/arm-cosmosdbforpostgresql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to restarts all nodes in the cluster.
 *
 * @summary restarts all nodes in the cluster.
 * x-ms-original-file: 2023-03-02-preview/ClusterRestart.json
 */
async function restartAllServersInTheCluster(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new CosmosDBForPostgreSQL(credential, subscriptionId);
  await client.clusters.restart("TestGroup", "testcluster1");
}

async function main(): Promise<void> {
  await restartAllServersInTheCluster();
}

main().catch(console.error);
