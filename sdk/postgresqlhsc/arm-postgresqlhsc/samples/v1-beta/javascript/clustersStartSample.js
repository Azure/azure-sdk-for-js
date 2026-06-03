// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DBforPostgreSQLClient } = require("@azure/arm-postgresqlhsc");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to starts stopped compute on all cluster nodes.
 *
 * @summary starts stopped compute on all cluster nodes.
 * x-ms-original-file: 2023-03-02-preview/ClusterStart.json
 */
async function startAllServersInTheCluster() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new DBforPostgreSQLClient(credential, subscriptionId);
  await client.clusters.start("TestGroup", "testcluster1");
}

async function main() {
  await startAllServersInTheCluster();
}

main().catch(console.error);
