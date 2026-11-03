// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SiteRecoveryManagementClient } from "@azure/arm-recoveryservices-siterecovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to operation to initiate a failover of the replication protection cluster.
 *
 * @summary operation to initiate a failover of the replication protection cluster.
 * x-ms-original-file: 2025-08-01/ReplicationProtectionClusters_TestFailover.json
 */
async function executeTestFailoverForCluster(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "7c943c1b-5122-4097-90c8-861411bdd574";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.replicationProtectionClusters.testFailover(
    "resourceGroupPS1",
    "vault1",
    "fabric-pri-eastus",
    "pri-cloud-eastus",
    "testcluster",
    {
      properties: {
        failoverDirection: "PrimaryToRecovery",
        networkId:
          "/subscriptions/7c943c1b-5122-4097-90c8-861411bdd574/resourceGroups/ClusterTestRG-19-01-asr/providers/Microsoft.Network/virtualNetworks/adVNET-asr",
        networkType: "VmNetworkAsInput",
        providerSpecificDetails: {
          clusterRecoveryPointId:
            "/Subscriptions/7c943c1b-5122-4097-90c8-861411bdd574/resourceGroups/resourceGroupPS1/providers/Microsoft.RecoveryServices/vaults/vault1/replicationFabrics/fabric-pri-eastus/replicationProtectionContainers/pri-cloud-eastus/replicationProtectionClusters/testcluster/recoveryPoints/cc48b7f3-b267-432b-ad76-45528974dc62",
          individualNodeRecoveryPoints: [
            "/Subscriptions/7c943c1b-5122-4097-90c8-861411bdd574/resourceGroups/resourceGroupPS1/providers/Microsoft.RecoveryServices/vaults/vault1/replicationFabrics/fabric-pri-eastus/replicationProtectionContainers/pri-cloud-eastus/replicationProtectedItems/testVM/recoveryPoints/b5c2051b-79e3-41ad-9d25-244f6ef8ce7d",
          ],
          instanceType: "A2A",
        },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await executeTestFailoverForCluster();
}

main().catch(console.error);
