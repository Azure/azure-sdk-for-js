// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DBforPostgreSQLClient } = require("@azure/arm-postgresqlhsc");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to restarts all nodes in the cluster.
 *
 * @summary restarts all nodes in the cluster.
 * x-ms-original-file: 2023-03-02-preview/ClusterRestart.json
 */
async function restartAllServersInTheCluster() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new DBforPostgreSQLClient(credential, subscriptionId);
  await client.clusters.restart("TestGroup", "testcluster1");
}

async function main() {
  await restartAllServersInTheCluster();
}

main().catch(console.error);
