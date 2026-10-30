// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SiteRecoveryManagementClient } from "@azure/arm-recoveryservices-siterecovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to update the recovery settings of an ASR replication protected item.
 *
 * @summary the operation to update the recovery settings of an ASR replication protected item.
 * x-ms-original-file: 2026-11-01/ReplicationProtectedItems_Update.json
 */
async function updatesTheReplicationProtectedItemSettings(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c183865e-6077-46f2-a3b1-deb0f4f4650a";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.replicationProtectedItems.update(
    "resourceGroupPS1",
    "vault1",
    "cloud1",
    "cloud_6d224fc6-f326-5d35-96de-fbf51efb3179",
    "f8491e4f-817a-40dd-a90c-af773978c75b",
    {
      properties: {
        licenseType: "WindowsServer",
        providerSpecificDetails: { instanceType: "HyperVReplicaAzure" },
        recoveryAzureVMName: "vm1",
        recoveryAzureVMSize: "Basic_A0",
        selectedRecoveryAzureNetworkId:
          "/subscriptions/c183865e-6077-46f2-a3b1-deb0f4f4650a/resourceGroups/siterecoveryProd1/providers/Microsoft.Network/virtualNetworks/vnetavrai",
        vmNics: [
          {
            ipConfigs: [
              {
                ipConfigName: "ipconfig1",
                isPrimary: true,
                recoveryStaticIPAddress: "10.0.2.46",
                recoverySubnetName: "subnet1",
              },
            ],
            nicId:
              "TWljcm9zb2Z0OkY4NDkxRTRGLTgxN0EtNDBERC1BOTBDLUFGNzczOTc4Qzc1Qlw3NjAwMzMxRS03NDk4LTQ0QTQtQjdDNy0xQjY1NkJDREQ1MkQ=",
            selectionType: "SelectedByUser",
          },
        ],
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to the operation to update the recovery settings of an ASR replication protected item.
 *
 * @summary the operation to update the recovery settings of an ASR replication protected item.
 * x-ms-original-file: 2026-11-01/ReplicationProtectedItems_Update_A2ACvm.json
 */
async function updatesTheTargetConfidentialDiskEncryptionSetForAnA2AConfidentialVM(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "42195872-7e70-4f8a-837f-84b28ecbb78b";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.replicationProtectedItems.update(
    "priyanprg",
    "priyanponeboxvault",
    "CentralUSCanSite",
    "CentralUSCancloud",
    "a2aCvmVm",
    {
      properties: {
        providerSpecificDetails: {
          instanceType: "A2A",
          recoveryResourceGroupId:
            "/Subscriptions/42195872-7e70-4f8a-837f-84b28ecbb78b/resourceGroups/priyanprg",
          managedDiskUpdateDetails: [
            {
              diskId:
                "/Subscriptions/42195872-7e70-4f8a-837f-84b28ecbb78b/resourceGroups/priyanprg/providers/Microsoft.Compute/disks/a2aCvmVm-osdisk",
              recoveryReplicaDiskAccountType: "Premium_LRS",
              recoveryTargetDiskAccountType: "Premium_LRS",
              confidentialDiskEncryptionInfo: {
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
 * This sample demonstrates how to the operation to update the recovery settings of an ASR replication protected item.
 *
 * @summary the operation to update the recovery settings of an ASR replication protected item.
 * x-ms-original-file: 2026-11-01/ReplicationProtectedItems_Update_A2ADualStack.json
 */
async function updatesTheRecoveryIpConfigsOfADualStackIPv4AndIPv6A2AProtectedItem(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "42195872-7e70-4f8a-837f-84b28ecbb78b";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.replicationProtectedItems.update(
    "priyanprg",
    "priyanponeboxvault",
    "CentralUSCanSite",
    "CentralUSCancloud",
    "a2aDualStackVm",
    {
      properties: {
        selectedRecoveryAzureNetworkId:
          "/Subscriptions/42195872-7e70-4f8a-837f-84b28ecbb78b/resourceGroups/priyanprg/providers/Microsoft.Network/virtualNetworks/dualstack-recovery-vnet",
        vmNics: [
          {
            nicId:
              "/Subscriptions/42195872-7e70-4f8a-837f-84b28ecbb78b/resourceGroups/priyanprg/providers/Microsoft.Network/networkInterfaces/a2aDualStackVm-nic",
            selectionType: "SelectedByUser",
            ipConfigs: [
              {
                ipConfigName: "ipconfig1",
                isPrimary: true,
                isSeletedForFailover: true,
                recoverySubnetName: "dualstack-subnet",
                recoveryStaticIPAddress: "10.0.2.46",
              },
              {
                ipConfigName: "ipconfig-v6",
                isPrimary: false,
                isSeletedForFailover: true,
                recoverySubnetName: "dualstack-subnet",
                recoveryStaticIPAddress: "2001:db8:1::4",
              },
            ],
          },
        ],
        providerSpecificDetails: {
          instanceType: "A2A",
          recoveryResourceGroupId:
            "/Subscriptions/42195872-7e70-4f8a-837f-84b28ecbb78b/resourceGroups/priyanprg",
        },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updatesTheReplicationProtectedItemSettings();
  await updatesTheTargetConfidentialDiskEncryptionSetForAnA2AConfidentialVM();
  await updatesTheRecoveryIpConfigsOfADualStackIPv4AndIPv6A2AProtectedItem();
}

main().catch(console.error);
