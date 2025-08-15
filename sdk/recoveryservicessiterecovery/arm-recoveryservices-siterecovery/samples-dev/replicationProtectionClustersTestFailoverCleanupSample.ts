// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  ClusterTestFailoverCleanupInput,
  SiteRecoveryManagementClient,
} from "@azure/arm-recoveryservices-siterecovery";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Operation to clean up the test failover of a replication protected cluster.
 *
 * @summary Operation to clean up the test failover of a replication protected cluster.
 * x-ms-original-file: specification/recoveryservicessiterecovery/resource-manager/Microsoft.RecoveryServices/stable/2025-01-01/examples/ReplicationProtectionClusters_TestFailoverCleanup.json
 */
async function executeTestFailoverCleanupForCluster(): Promise<void> {
  const subscriptionId =
    process.env["RECOVERYSERVICESSITERECOVERY_SUBSCRIPTION_ID"] ||
    "7c943c1b-5122-4097-90c8-861411bdd574";
  const resourceGroupName =
    process.env["RECOVERYSERVICESSITERECOVERY_RESOURCE_GROUP"] ||
    "resourceGroupPS1";
  const resourceName = "vault1";
  const fabricName = "fabric-pri-eastus";
  const protectionContainerName = "pri-cloud-eastus";
  const replicationProtectionClusterName = "testcluster";
  const cleanupInput: ClusterTestFailoverCleanupInput = {
    properties: { comments: "Test Failover Cleanup" },
  };
  const credential = new DefaultAzureCredential();
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result =
    await client.replicationProtectionClusters.beginTestFailoverCleanupAndWait(
      resourceGroupName,
      resourceName,
      fabricName,
      protectionContainerName,
      replicationProtectionClusterName,
      cleanupInput,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await executeTestFailoverCleanupForCluster();
}

main().catch(console.error);
