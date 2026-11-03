// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SiteRecoveryManagementClient } = require("@azure/arm-recoveryservices-siterecovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to operation to clean up the test failover of a replication protected cluster.
 *
 * @summary operation to clean up the test failover of a replication protected cluster.
 * x-ms-original-file: 2025-08-01/ReplicationProtectionClusters_TestFailoverCleanup.json
 */
async function executeTestFailoverCleanupForCluster() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "7c943c1b-5122-4097-90c8-861411bdd574";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.replicationProtectionClusters.testFailoverCleanup(
    "resourceGroupPS1",
    "vault1",
    "fabric-pri-eastus",
    "pri-cloud-eastus",
    "testcluster",
    { properties: { comments: "Test Failover Cleanup" } },
  );
  console.log(result);
}

async function main() {
  await executeTestFailoverCleanupForCluster();
}

main().catch(console.error);
