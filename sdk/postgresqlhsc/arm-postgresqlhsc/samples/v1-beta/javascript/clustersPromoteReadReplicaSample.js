// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DBforPostgreSQLClient } = require("@azure/arm-postgresqlhsc");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to promotes read replica cluster to an independent read-write cluster.
 *
 * @summary promotes read replica cluster to an independent read-write cluster.
 * x-ms-original-file: 2023-03-02-preview/ClusterPromoteReadReplica.json
 */
async function promoteReadReplicaClusterToAnIndependentReadWriteCluster() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new DBforPostgreSQLClient(credential, subscriptionId);
  await client.clusters.promoteReadReplica("TestGroup", "testcluster1");
}

async function main() {
  await promoteReadReplicaClusterToAnIndependentReadWriteCluster();
}

main().catch(console.error);
