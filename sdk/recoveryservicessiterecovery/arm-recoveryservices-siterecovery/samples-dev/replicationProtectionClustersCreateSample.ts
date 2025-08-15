// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  ReplicationProtectionCluster,
  SiteRecoveryManagementClient,
} from "@azure/arm-recoveryservices-siterecovery";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to The operation to create an ASR replication protection cluster item.
 *
 * @summary The operation to create an ASR replication protection cluster item.
 * x-ms-original-file: specification/recoveryservicessiterecovery/resource-manager/Microsoft.RecoveryServices/stable/2025-01-01/examples/ReplicationProtectionClusters_Create.json
 */
async function createReplicationProtectionCluster(): Promise<void> {
  const subscriptionId =
    process.env["RECOVERYSERVICESSITERECOVERY_SUBSCRIPTION_ID"] ||
    "c183865e-6077-46f2-a3b1-deb0f4f4650a";
  const resourceGroupName =
    process.env["RECOVERYSERVICESSITERECOVERY_RESOURCE_GROUP"] ||
    "resourceGroupPS1";
  const resourceName = "vault1";
  const fabricName = "eastus";
  const protectionContainerName = "eastus-container";
  const replicationProtectionClusterName = "cluster12";
  const replicationProtectionCluster: ReplicationProtectionCluster = {
    properties: {
      policyId:
        "/Subscriptions/c183865e-6077-46f2-a3b1-deb0f4f4650a/resourceGroups/resourceGroupPS1/providers/Microsoft.RecoveryServices/vaults/vault1/replicationPolicies/24-hour-retention-policy",
      providerSpecificDetails: { instanceType: "A2A" },
      recoveryContainerId:
        "/Subscriptions/c183865e-6077-46f2-a3b1-deb0f4f4650a/resourceGroups/resourceGroupPS1/providers/Microsoft.RecoveryServices/vaults/vault1/replicationFabrics/centraluseuap/replicationProtectionContainers/centraluseuap-container",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.replicationProtectionClusters.beginCreateAndWait(
    resourceGroupName,
    resourceName,
    fabricName,
    protectionContainerName,
    replicationProtectionClusterName,
    replicationProtectionCluster,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createReplicationProtectionCluster();
}

main().catch(console.error);
