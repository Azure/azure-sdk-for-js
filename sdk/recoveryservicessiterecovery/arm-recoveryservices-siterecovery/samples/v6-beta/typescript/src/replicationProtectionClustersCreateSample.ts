// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SiteRecoveryManagementClient } from "@azure/arm-recoveryservices-siterecovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to create an ASR replication protection cluster item.
 *
 * @summary the operation to create an ASR replication protection cluster item.
 * x-ms-original-file: 2025-08-01/ReplicationProtectionClusters_Create.json
 */
async function createReplicationProtectionCluster(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c183865e-6077-46f2-a3b1-deb0f4f4650a";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.replicationProtectionClusters.create(
    "resourceGroupPS1",
    "vault1",
    "eastus",
    "eastus-container",
    "cluster12",
    {
      properties: {
        policyId:
          "/Subscriptions/c183865e-6077-46f2-a3b1-deb0f4f4650a/resourceGroups/resourceGroupPS1/providers/Microsoft.RecoveryServices/vaults/vault1/replicationPolicies/24-hour-retention-policy",
        providerSpecificDetails: { instanceType: "A2A" },
        recoveryContainerId:
          "/Subscriptions/c183865e-6077-46f2-a3b1-deb0f4f4650a/resourceGroups/resourceGroupPS1/providers/Microsoft.RecoveryServices/vaults/vault1/replicationFabrics/centraluseuap/replicationProtectionContainers/centraluseuap-container",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createReplicationProtectionCluster();
}

main().catch(console.error);
