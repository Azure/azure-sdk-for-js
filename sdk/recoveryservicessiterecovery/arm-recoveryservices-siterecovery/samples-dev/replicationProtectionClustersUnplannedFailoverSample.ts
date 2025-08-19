// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Operation to initiate a failover of the replication protection cluster.
 *
 * @summary Operation to initiate a failover of the replication protection cluster.
 * x-ms-original-file: specification/recoveryservicessiterecovery/resource-manager/Microsoft.RecoveryServices/stable/2025-01-01/examples/ReplicationProtectionClusters_UnplannedFailover.json
 */

import {
  ClusterUnplannedFailoverInput,
  SiteRecoveryManagementClient,
} from "@azure/arm-recoveryservices-siterecovery";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function executeUnplannedClusterFailover(): Promise<void> {
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
  const failoverInput: ClusterUnplannedFailoverInput = {
    properties: {
      failoverDirection: "primarytorecovery",
      providerSpecificDetails: {
        clusterRecoveryPointId:
          "/Subscriptions/7c943c1b-5122-4097-90c8-861411bdd574/resourceGroups/resourceGroupPS1/providers/Microsoft.RecoveryServices/vaults/vault1/replicationFabrics/fabric-pri-eastus/replicationProtectionContainers/pri-cloud-eastus/replicationProtectionClusters/testcluster/recoveryPoints/cc48b7f3-b267-432b-ad76-45528974dc62",
        individualNodeRecoveryPoints: [
          "/Subscriptions/7c943c1b-5122-4097-90c8-861411bdd574/resourceGroups/resourceGroupPS1/providers/Microsoft.RecoveryServices/vaults/vault1/replicationFabrics/fabric-pri-eastus/replicationProtectionContainers/pri-cloud-eastus/replicationProtectedItems/testVM/recoveryPoints/b5c2051b-79e3-41ad-9d25-244f6ef8ce7d",
        ],
        instanceType: "A2A",
      },
      sourceSiteOperations: "NotRequired",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result =
    await client.replicationProtectionClusters.beginUnplannedFailoverAndWait(
      resourceGroupName,
      resourceName,
      fabricName,
      protectionContainerName,
      replicationProtectionClusterName,
      failoverInput,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await executeUnplannedClusterFailover();
}

main().catch(console.error);
