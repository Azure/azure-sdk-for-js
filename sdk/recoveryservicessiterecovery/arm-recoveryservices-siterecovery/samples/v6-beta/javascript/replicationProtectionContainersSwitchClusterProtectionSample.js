// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SiteRecoveryManagementClient } = require("@azure/arm-recoveryservices-siterecovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to operation to switch protection from one container to another.
 *
 * @summary operation to switch protection from one container to another.
 * x-ms-original-file: 2025-08-01/ReplicationProtectionContainers_SwitchClusterProtection.json
 */
async function switchesProtectionFromOneContainerToAnotherOrOneReplicationProviderToAnother() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "7c943c1b-5122-4097-90c8-861411bdd574";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.replicationProtectionContainers.switchClusterProtection(
    "resourceGroupPS1",
    "vault1",
    "fabric-pri-eastus",
    "pri-cloud-eastus",
    {
      properties: {
        providerSpecificDetails: {
          instanceType: "A2A",
          policyId:
            "/Subscriptions/7c943c1b-5122-4097-90c8-861411bdd574/resourceGroups/resourceGroupPS1/providers/Microsoft.RecoveryServices/vaults/vault1/replicationPolicies/klncksan",
          protectedItemsDetail: [
            {
              recoveryResourceGroupId:
                "/subscriptions/7c943c1b-5122-4097-90c8-861411bdd574/resourceGroups/ClusterTestRG-19-01-asr",
              replicationProtectedItemName: "yNdYnDYKZ7hYU7zyVeBychFBCyAbEkrJcJNUarDrXio",
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
              replicationProtectedItemName: "kdUdWvpVnm3QgOQPHoVMX8YAtAO8OC4kKNjt40ERSr4",
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
    },
  );
  console.log(result);
}

async function main() {
  await switchesProtectionFromOneContainerToAnotherOrOneReplicationProviderToAnother();
}

main().catch(console.error);
