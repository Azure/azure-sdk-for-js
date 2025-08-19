// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Operation to switch protection from one container to another.
 *
 * @summary Operation to switch protection from one container to another.
 * x-ms-original-file: specification/recoveryservicessiterecovery/resource-manager/Microsoft.RecoveryServices/stable/2025-01-01/examples/ReplicationProtectionContainers_SwitchClusterProtection.json
 */

import {
  SwitchClusterProtectionInput,
  SiteRecoveryManagementClient,
} from "@azure/arm-recoveryservices-siterecovery";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function switchesProtectionFromOneContainerToAnotherOrOneReplicationProviderToAnother(): Promise<void> {
  const subscriptionId =
    process.env["RECOVERYSERVICESSITERECOVERY_SUBSCRIPTION_ID"] ||
    "7c943c1b-5122-4097-90c8-861411bdd574";
  const resourceGroupName =
    process.env["RECOVERYSERVICESSITERECOVERY_RESOURCE_GROUP"] ||
    "resourceGroupPS1";
  const resourceName = "vault1";
  const fabricName = "fabric-pri-eastus";
  const protectionContainerName = "pri-cloud-eastus";
  const switchInput: SwitchClusterProtectionInput = {
    properties: {
      providerSpecificDetails: {
        instanceType: "A2A",
        policyId:
          "/Subscriptions/7c943c1b-5122-4097-90c8-861411bdd574/resourceGroups/resourceGroupPS1/providers/Microsoft.RecoveryServices/vaults/vault1/replicationPolicies/klncksan",
        protectedItemsDetail: [
          {
            recoveryResourceGroupId:
              "/subscriptions/7c943c1b-5122-4097-90c8-861411bdd574/resourceGroups/ClusterTestRG-19-01-asr",
            replicationProtectedItemName:
              "yNdYnDYKZ7hYU7zyVeBychFBCyAbEkrJcJNUarDrXio",
            vmManagedDisks: [
              {
                diskId:
                  "/subscriptions/7c943c1b-5122-4097-90c8-861411bdd574/resourcegroups/clustertestrg-19-01/providers/microsoft.compute/disks/sdgql0-osdisk",
                primaryStagingAzureStorageAccountId:
                  "/subscriptions/7c943c1b-5122-4097-90c8-861411bdd574/resourceGroups/clustertestrg-19-01/providers/Microsoft.Storage/storageAccounts/ix701lvaasrcache",
                recoveryResourceGroupId:
                  "/subscriptions/7c943c1b-5122-4097-90c8-861411bdd574/resourceGroups/ClusterTestRG-19-01-asr",
              },
            ],
          },
          {
            recoveryResourceGroupId:
              "/subscriptions/7c943c1b-5122-4097-90c8-861411bdd574/resourceGroups/ClusterTestRG-19-01-asr",
            replicationProtectedItemName:
              "kdUdWvpVnm3QgOQPHoVMX8YAtAO8OC4kKNjt40ERSr4",
            vmManagedDisks: [
              {
                diskId:
                  "/subscriptions/7c943c1b-5122-4097-90c8-861411bdd574/resourcegroups/clustertestrg-19-01/providers/microsoft.compute/disks/sdgql1-osdisk",
                primaryStagingAzureStorageAccountId:
                  "/subscriptions/7c943c1b-5122-4097-90c8-861411bdd574/resourceGroups/clustertestrg-19-01/providers/Microsoft.Storage/storageAccounts/ix701lvaasrcache",
                recoveryResourceGroupId:
                  "/subscriptions/7c943c1b-5122-4097-90c8-861411bdd574/resourceGroups/ClusterTestRG-19-01-asr",
              },
            ],
          },
        ],
        recoveryContainerId:
          "/Subscriptions/7c943c1b-5122-4097-90c8-861411bdd574/resourceGroups/resourceGroupPS1/providers/Microsoft.RecoveryServices/vaults/vault1/replicationFabrics/fabric-rec-westus/replicationProtectionContainers/rec-cloud-westus",
      },
      replicationProtectionClusterName: "testcluster",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result =
    await client.replicationProtectionContainers.beginSwitchClusterProtectionAndWait(
      resourceGroupName,
      resourceName,
      fabricName,
      protectionContainerName,
      switchInput,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await switchesProtectionFromOneContainerToAnotherOrOneReplicationProviderToAnother();
}

main().catch(console.error);
