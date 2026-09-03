// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SiteRecoveryManagementClient } = require("@azure/arm-recoveryservices-siterecovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to operation to initiate commit failover of the replication protection cluster.
 *
 * @summary operation to initiate commit failover of the replication protection cluster.
 * x-ms-original-file: 2025-08-01/ReplicationProtectionClusters_FailoverCommit.json
 */
async function executeCommitFailoverForCluster() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "7c943c1b-5122-4097-90c8-861411bdd574";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.replicationProtectionClusters.failoverCommit(
    "resourceGroupPS1",
    "vault1",
    "fabric-pri-eastus",
    "pri-cloud-eastus",
    "testcluster",
  );
  console.log(result);
}

async function main() {
  await executeCommitFailoverForCluster();
}

main().catch(console.error);
