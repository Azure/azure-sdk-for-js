// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SiteRecoveryManagementClient } = require("@azure/arm-recoveryservices-siterecovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to create an ASR replication protected item (Enable replication).
 *
 * @summary the operation to create an ASR replication protected item (Enable replication).
 * x-ms-original-file: 2026-11-01/ReplicationProtectedItems_Create.json
 */
async function enablesProtection() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c183865e-6077-46f2-a3b1-deb0f4f4650a";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.replicationProtectedItems.create(
    "resourceGroupPS1",
    "vault1",
    "cloud1",
    "cloud_6d224fc6-f326-5d35-96de-fbf51efb3179",
    "f8491e4f-817a-40dd-a90c-af773978c75b",
    {
      properties: {
        policyId:
          "/Subscriptions/c183865e-6077-46f2-a3b1-deb0f4f4650a/resourceGroups/resourceGroupPS1/providers/Microsoft.RecoveryServices/vaults/vault1/replicationPolicies/protectionprofile1",
        protectableItemId:
          "/Subscriptions/c183865e-6077-46f2-a3b1-deb0f4f4650a/resourceGroups/resourceGroupPS1/providers/Microsoft.RecoveryServices/vaults/vault1/replicationFabrics/cloud1/replicationProtectionContainers/cloud_6d224fc6-f326-5d35-96de-fbf51efb3179/replicationProtectableItems/f8491e4f-817a-40dd-a90c-af773978c75b",
        providerSpecificDetails: { instanceType: "HyperVReplicaAzure" },
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to the operation to create an ASR replication protected item (Enable replication).
 *
 * @summary the operation to create an ASR replication protected item (Enable replication).
 * x-ms-original-file: 2026-11-01/ReplicationProtectedItems_Create_A2ACvm.json
 */
async function enablesProtectionForAnA2AConfidentialVMWithCMKDiskEncryption() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "42195872-7e70-4f8a-837f-84b28ecbb78b";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.replicationProtectedItems.create(
    "priyanprg",
    "priyanponeboxvault",
    "CentralUSCanSite",
    "CentralUSCancloud",
    "a2aCvmVm",
    {
      properties: {
        policyId:
          "/Subscriptions/42195872-7e70-4f8a-837f-84b28ecbb78b/resourceGroups/priyanprg/providers/Microsoft.RecoveryServices/vaults/priyanponeboxvault/replicationPolicies/a2aPolicy",
        protectableItemId:
          "/Subscriptions/42195872-7e70-4f8a-837f-84b28ecbb78b/resourceGroups/priyanprg/providers/Microsoft.RecoveryServices/vaults/priyanponeboxvault/replicationFabrics/CentralUSCanSite/replicationProtectionContainers/CentralUSCancloud/replicationProtectableItems/a2aCvmVm",
        providerSpecificDetails: {
          instanceType: "A2A",
          fabricObjectId:
            "/Subscriptions/42195872-7e70-4f8a-837f-84b28ecbb78b/resourceGroups/priyanprg/providers/Microsoft.Compute/virtualMachines/a2aCvmVm",
          recoveryContainerId:
            "/Subscriptions/42195872-7e70-4f8a-837f-84b28ecbb78b/resourceGroups/priyanprg/providers/Microsoft.RecoveryServices/vaults/priyanponeboxvault/replicationFabrics/EUSCanSite/replicationProtectionContainers/euscancloud",
          recoveryResourceGroupId:
            "/Subscriptions/42195872-7e70-4f8a-837f-84b28ecbb78b/resourceGroups/priyanprg",
          vmManagedDisks: [
            {
              diskId:
                "/Subscriptions/42195872-7e70-4f8a-837f-84b28ecbb78b/resourceGroups/priyanprg/providers/Microsoft.Compute/disks/a2aCvmVm-osdisk",
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
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to the operation to create an ASR replication protected item (Enable replication).
 *
 * @summary the operation to create an ASR replication protected item (Enable replication).
 * x-ms-original-file: 2026-11-01/ReplicationProtectedItems_Create_InMageRcmEdgeZone.json
 */
async function enablesProtectionForAnInMageRCMVMInAnExtendedLocation() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c183865e-6077-46f2-a3b1-deb0f4f4650a";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.replicationProtectedItems.create(
    "resourceGroupPS1",
    "vault1",
    "vmware-fabric",
    "vmware-container",
    "machine1",
    {
      properties: {
        policyId:
          "/subscriptions/c183865e-6077-46f2-a3b1-deb0f4f4650a/resourceGroups/resourceGroupPS1/providers/Microsoft.RecoveryServices/vaults/vault1/replicationPolicies/protectionProfile1",
        protectableItemId:
          "/subscriptions/c183865e-6077-46f2-a3b1-deb0f4f4650a/resourceGroups/resourceGroupPS1/providers/Microsoft.RecoveryServices/vaults/vault1/replicationFabrics/vmware-fabric/replicationProtectionContainers/vmware-container/replicationProtectableItems/machine1",
        providerSpecificDetails: {
          fabricDiscoveryMachineId:
            "/subscriptions/c183865e-6077-46f2-a3b1-deb0f4f4650a/resourceGroups/sourceResourceGroup/providers/Microsoft.OffAzure/VMwareSites/site1/machines/machine1",
          instanceType: "InMageRcm",
          processServerId: "process-server-1",
          targetExtendedLocation: { name: "edge-zone-1", type: "EdgeZone" },
          targetNetworkId:
            "/subscriptions/c183865e-6077-46f2-a3b1-deb0f4f4650a/resourceGroups/targetResourceGroup/providers/Microsoft.Network/virtualNetworks/targetVNet",
          targetResourceGroupId:
            "/subscriptions/c183865e-6077-46f2-a3b1-deb0f4f4650a/resourceGroups/targetResourceGroup",
          targetSubnetName: "default",
          targetVmName: "machine1",
          targetVmSize: "Standard_D2s_v3",
        },
      },
    },
  );
  console.log(result);
}

async function main() {
  await enablesProtection();
  await enablesProtectionForAnA2AConfidentialVMWithCMKDiskEncryption();
  await enablesProtectionForAnInMageRCMVMInAnExtendedLocation();
}

main().catch(console.error);
