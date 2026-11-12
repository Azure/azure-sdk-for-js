// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SiteRecoveryManagementClient } = require("@azure/arm-recoveryservices-siterecovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to operation to switch protection from one container to another or one replication provider to another.
 *
 * @summary operation to switch protection from one container to another or one replication provider to another.
 * x-ms-original-file: 2026-11-01/ReplicationProtectionContainers_SwitchProtection.json
 */
async function switchesProtectionFromOneContainerToAnotherOrOneReplicationProviderToAnother() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "42195872-7e70-4f8a-837f-84b28ecbb78b";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.replicationProtectionContainers.switchProtection(
    "priyanprg",
    "priyanponeboxvault",
    "CentralUSCanSite",
    "CentralUSCancloud",
    {
      properties: {
        providerSpecificDetails: {
          instanceType: "A2A",
          recoveryContainerId:
            "/Subscriptions/42195872-7e70-4f8a-837f-84b28ecbb78b/resourceGroups/priyanprg/providers/Microsoft.RecoveryServices/vaults/priyanponeboxvault/replicationFabrics/EUSCanSite/replicationProtectionContainers/euscancloud",
          recoveryResourceGroupId:
            "/Subscriptions/42195872-7e70-4f8a-837f-84b28ecbb78b/resourceGroups/priyanprg",
          vmManagedDisks: [
            {
              diskId:
                "/Subscriptions/42195872-7e70-4f8a-837f-84b28ecbb78b/resourceGroups/priyanprg/providers/Microsoft.Compute/disks/a2aSwapOsVm-osdisk",
              primaryStagingAzureStorageAccountId:
                "/Subscriptions/42195872-7e70-4f8a-837f-84b28ecbb78b/resourceGroups/priyanprg/providers/Microsoft.Storage/storageAccounts/a2acache",
              recoveryResourceGroupId:
                "/Subscriptions/42195872-7e70-4f8a-837f-84b28ecbb78b/resourceGroups/priyanprg",
              recoveryReplicaDiskAccountType: "Premium_LRS",
              recoveryTargetDiskAccountType: "Premium_LRS",
              confidentialDiskEncryptionInfo: {
                recoveryReplicaConfidentialDiskEncryptionSetId:
                  "/Subscriptions/42195872-7e70-4f8a-837f-84b28ecbb78b/resourceGroups/priyanprg/providers/Microsoft.Compute/diskEncryptionSets/cvm-replica-des",
                recoveryTargetConfidentialDiskEncryptionSetId:
                  "/Subscriptions/42195872-7e70-4f8a-837f-84b28ecbb78b/resourceGroups/priyanprg/providers/Microsoft.Compute/diskEncryptionSets/cvm-target-des",
              },
            },
          ],
          recoveryConfidentialDataDiskEncryptionIdentity:
            "/Subscriptions/42195872-7e70-4f8a-837f-84b28ecbb78b/resourceGroups/priyanprg/providers/Microsoft.ManagedIdentity/userAssignedIdentities/cvm-cdde-uami",
        },
        replicationProtectedItemName: "a2aSwapOsVm",
      },
    },
  );
  console.log(result);
}

async function main() {
  await switchesProtectionFromOneContainerToAnotherOrOneReplicationProviderToAnother();
}

main().catch(console.error);
