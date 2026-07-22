// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBForPostgreSQL } = require("@azure/arm-cosmosdbforpostgresql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to stops compute on all cluster nodes.
 *
 * @summary stops compute on all cluster nodes.
 * x-ms-original-file: 2023-03-02-preview/ClusterStop.json
 */
async function stopAllServersInTheCluster() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new CosmosDBForPostgreSQL(credential, subscriptionId);
  await client.clusters.stop("TestGroup", "testcluster1");
}

async function main() {
  await stopAllServersInTheCluster();
}

main().catch(console.error);
