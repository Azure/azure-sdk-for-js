// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RecoveryServicesBackupClient } from "@azure/arm-recoveryservicesbackup";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to restores the specified backed up data. This is an asynchronous operation. To know the status of this API call, use
 * GetProtectedItemOperationResult API.
 *
 * @summary restores the specified backed up data. This is an asynchronous operation. To know the status of this API call, use
 * GetProtectedItemOperationResult API.
 * x-ms-original-file: 2026-07-01/AzureIaasVm/TriggerRestore_ALR_IaasVMRestoreRequest.json
 */
async function restoreToNewAzureIaasVmWithIaasVMRestoreRequest(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  await client.restores.trigger(
    "testVault",
    "netsdktestrg",
    "Azure",
    "IaasVMContainer;iaasvmcontainerv2;netsdktestrg;netvmtestv2vm1",
    "VM;iaasvmcontainerv2;netsdktestrg;netvmtestv2vm1",
    "348916168024334",
    {
      properties: {
        createNewCloudService: false,
        encryptionDetails: { encryptionEnabled: false },
        identityInfo: { isSystemAssignedIdentity: true },
        objectType: "IaasVMRestoreRequest",
        originalStorageAccountOption: false,
        recoveryPointId: "348916168024334",
        recoveryType: "AlternateLocation",
        region: "southeastasia",
        sourceResourceId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/netsdktestrg/providers/Microsoft.Compute/virtualMachines/netvmtestv2vm1",
        storageAccountId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/testRg/providers/Microsoft.Storage/storageAccounts/testingAccount",
        subnetId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/testRg/providers/Microsoft.Network/virtualNetworks/testNet/subnets/default",
        targetResourceGroupId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/netsdktestrg2",
        targetVirtualMachineId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/netsdktestrg2/providers/Microsoft.Compute/virtualmachines/RSMDALRVM981435",
        virtualNetworkId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/testRg/providers/Microsoft.Network/virtualNetworks/testNet",
      },
    },
  );
}

/**
 * This sample demonstrates how to restores the specified backed up data. This is an asynchronous operation. To know the status of this API call, use
 * GetProtectedItemOperationResult API.
 *
 * @summary restores the specified backed up data. This is an asynchronous operation. To know the status of this API call, use
 * GetProtectedItemOperationResult API.
 * x-ms-original-file: 2026-07-01/AzureIaasVm/TriggerRestore_ALR_IaasVMRestoreRequest_DataDiskEncryption.json
 */
async function restoreToNewAzureIaasVmWithIaasVMRestoreRequestWithIdentityBasedRestoreDetailsAndPerDiskEncryptionSettings(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  await client.restores.trigger(
    "testVault",
    "netsdktestrg",
    "Azure",
    "IaasVMContainer;iaasvmcontainerv2;netsdktestrg;netvmtestv2vm1",
    "VM;iaasvmcontainerv2;netsdktestrg;netvmtestv2vm1",
    "348916168024334",
    {
      properties: {
        createNewCloudService: false,
        encryptionDetails: { encryptionEnabled: false },
        identityBasedRestoreDetails: {
          targetStorageAccountId:
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/testRg/providers/Microsoft.Storage/storageAccounts/testingAccount",
        },
        identityInfo: { isSystemAssignedIdentity: true },
        objectType: "IaasVMRestoreRequest",
        originalStorageAccountOption: false,
        recoveryPointId: "348916168024334",
        recoveryType: "AlternateLocation",
        region: "southeastasia",
        securedVMDetails: {
          securedVMOsDiskEncryptionSetId:
            "/subscriptions/5288acd1-ba79-4377-9205-9f220331a44a/resourceGroups/asmaskarrg-cvm-os-cmk-3cmk-1none-data-2606040706/providers/Microsoft.Compute/diskEncryptionSets/des-os",
          dataDiskEncryptionSettings: {
            perDiskEncryptionSetIds: [
              {
                lun: 0,
                diskEncryptionSetId:
                  "/subscriptions/5288acd1-ba79-4377-9205-9f220331a44a/resourceGroups/asmaskarrg-cvm-os-cmk-3cmk-1none-data-2606040706/providers/Microsoft.Compute/diskEncryptionSets/des-data-lun-0",
              },
              {
                lun: 1,
                diskEncryptionSetId:
                  "/subscriptions/5288acd1-ba79-4377-9205-9f220331a44a/resourceGroups/asmaskarrg-cvm-os-cmk-3cmk-1none-data-2606040706/providers/Microsoft.Compute/diskEncryptionSets/des-data-lun-1",
              },
              {
                lun: 2,
                diskEncryptionSetId:
                  "/subscriptions/5288acd1-ba79-4377-9205-9f220331a44a/resourceGroups/asmaskarrg-cvm-os-cmk-3cmk-1none-data-2606040706/providers/Microsoft.Compute/diskEncryptionSets/des-data-lun-2",
              },
            ],
            dataDiskEncryptionIdentity:
              "/subscriptions/5288acd1-ba79-4377-9205-9f220331a44a/resourcegroups/asmaskarrg-cvm-os-cmk-3cmk-1none-data-2606040706/providers/Microsoft.ManagedIdentity/userAssignedIdentities/uami-cdde",
          },
        },
        sourceResourceId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/netsdktestrg/providers/Microsoft.Compute/virtualMachines/netvmtestv2vm1",
        subnetId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/testRg/providers/Microsoft.Network/virtualNetworks/testNet/subnets/default",
        targetResourceGroupId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/netsdktestrg2",
        targetVirtualMachineId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/netsdktestrg2/providers/Microsoft.Compute/virtualmachines/RSMDALRVM981435",
        virtualNetworkId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/testRg/providers/Microsoft.Network/virtualNetworks/testNet",
      },
    },
  );
}

/**
 * This sample demonstrates how to restores the specified backed up data. This is an asynchronous operation. To know the status of this API call, use
 * GetProtectedItemOperationResult API.
 *
 * @summary restores the specified backed up data. This is an asynchronous operation. To know the status of this API call, use
 * GetProtectedItemOperationResult API.
 * x-ms-original-file: 2026-07-01/AzureIaasVm/TriggerRestore_ALR_IaasVMRestoreRequest_DataDiskEncryption_SingleEntry.json
 */
async function restoreToNewAzureIaasVmWithIaasVMRestoreRequestWithIdentityBasedRestoreDetailsAndDataDiskEncryptionSettings(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  await client.restores.trigger(
    "testVault",
    "netsdktestrg",
    "Azure",
    "IaasVMContainer;iaasvmcontainerv2;netsdktestrg;netvmtestv2vm1",
    "VM;iaasvmcontainerv2;netsdktestrg;netvmtestv2vm1",
    "348916168024334",
    {
      properties: {
        createNewCloudService: false,
        encryptionDetails: { encryptionEnabled: false },
        identityBasedRestoreDetails: {
          targetStorageAccountId:
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/testRg/providers/Microsoft.Storage/storageAccounts/testingAccount",
        },
        identityInfo: { isSystemAssignedIdentity: true },
        objectType: "IaasVMRestoreRequest",
        originalStorageAccountOption: false,
        recoveryPointId: "348916168024334",
        recoveryType: "AlternateLocation",
        region: "southeastasia",
        securedVMDetails: {
          securedVMOsDiskEncryptionSetId:
            "/subscriptions/5288acd1-ba79-4377-9205-9f220331a44a/resourceGroups/asmaskarrg-cvm-os-cmk-3cmk-1none-data-2606040706/providers/Microsoft.Compute/diskEncryptionSets/des-os",
          dataDiskEncryptionSettings: {
            dataDiskEncryptionSetId:
              "/subscriptions/5288acd1-ba79-4377-9205-9f220331a44a/resourceGroups/asmaskarrg-cvm-os-cmk-3cmk-1none-data-2606040706/providers/Microsoft.Compute/diskEncryptionSets/des-data-lun-0",
            dataDiskEncryptionIdentity:
              "/subscriptions/5288acd1-ba79-4377-9205-9f220331a44a/resourcegroups/asmaskarrg-cvm-os-cmk-3cmk-1none-data-2606040706/providers/Microsoft.ManagedIdentity/userAssignedIdentities/uami-cdde",
          },
        },
        sourceResourceId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/netsdktestrg/providers/Microsoft.Compute/virtualMachines/netvmtestv2vm1",
        subnetId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/testRg/providers/Microsoft.Network/virtualNetworks/testNet/subnets/default",
        targetResourceGroupId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/netsdktestrg2",
        targetVirtualMachineId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/netsdktestrg2/providers/Microsoft.Compute/virtualmachines/RSMDALRVM981435",
        virtualNetworkId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/testRg/providers/Microsoft.Network/virtualNetworks/testNet",
      },
    },
  );
}

/**
 * This sample demonstrates how to restores the specified backed up data. This is an asynchronous operation. To know the status of this API call, use
 * GetProtectedItemOperationResult API.
 *
 * @summary restores the specified backed up data. This is an asynchronous operation. To know the status of this API call, use
 * GetProtectedItemOperationResult API.
 * x-ms-original-file: 2026-07-01/AzureIaasVm/TriggerRestore_ALR_IaasVMRestoreRequest_IdentityBasedRestoreDetails.json
 */
async function restoreToNewAzureIaasVmWithIaasVMRestoreRequestWithIdentityBasedRestoreDetails(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  await client.restores.trigger(
    "testVault",
    "netsdktestrg",
    "Azure",
    "IaasVMContainer;iaasvmcontainerv2;netsdktestrg;netvmtestv2vm1",
    "VM;iaasvmcontainerv2;netsdktestrg;netvmtestv2vm1",
    "348916168024334",
    {
      properties: {
        createNewCloudService: false,
        encryptionDetails: { encryptionEnabled: false },
        identityBasedRestoreDetails: {
          targetStorageAccountId:
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/testRg/providers/Microsoft.Storage/storageAccounts/testingAccount",
        },
        identityInfo: { isSystemAssignedIdentity: true },
        objectType: "IaasVMRestoreRequest",
        originalStorageAccountOption: false,
        recoveryPointId: "348916168024334",
        recoveryType: "AlternateLocation",
        region: "southeastasia",
        sourceResourceId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/netsdktestrg/providers/Microsoft.Compute/virtualMachines/netvmtestv2vm1",
        subnetId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/testRg/providers/Microsoft.Network/virtualNetworks/testNet/subnets/default",
        targetResourceGroupId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/netsdktestrg2",
        targetVirtualMachineId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/netsdktestrg2/providers/Microsoft.Compute/virtualmachines/RSMDALRVM981435",
        virtualNetworkId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/testRg/providers/Microsoft.Network/virtualNetworks/testNet",
      },
    },
  );
}

/**
 * This sample demonstrates how to restores the specified backed up data. This is an asynchronous operation. To know the status of this API call, use
 * GetProtectedItemOperationResult API.
 *
 * @summary restores the specified backed up data. This is an asynchronous operation. To know the status of this API call, use
 * GetProtectedItemOperationResult API.
 * x-ms-original-file: 2026-07-01/AzureIaasVm/TriggerRestore_ALR_IaasVMRestoreWithRehydrationRequest.json
 */
async function restoreToNewAzureIaasVmWithIaasVMRestoreWithRehydrationRequest(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  await client.restores.trigger(
    "testVault",
    "netsdktestrg",
    "Azure",
    "IaasVMContainer;iaasvmcontainerv2;netsdktestrg;netvmtestv2vm1",
    "VM;iaasvmcontainerv2;netsdktestrg;netvmtestv2vm1",
    "348916168024334",
    {
      properties: {
        createNewCloudService: false,
        encryptionDetails: { encryptionEnabled: false },
        objectType: "IaasVMRestoreWithRehydrationRequest",
        originalStorageAccountOption: false,
        recoveryPointId: "348916168024334",
        recoveryPointRehydrationInfo: {
          rehydrationPriority: "High",
          rehydrationRetentionDuration: "P7D",
        },
        recoveryType: "AlternateLocation",
        region: "southeastasia",
        sourceResourceId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/netsdktestrg/providers/Microsoft.Compute/virtualMachines/netvmtestv2vm1",
        storageAccountId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/testRg/providers/Microsoft.Storage/storageAccounts/testingAccount",
        subnetId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/testRg/providers/Microsoft.Network/virtualNetworks/testNet/subnets/default",
        targetResourceGroupId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/netsdktestrg2",
        targetVirtualMachineId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/netsdktestrg2/providers/Microsoft.Compute/virtualmachines/RSMDALRVM981435",
        virtualNetworkId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/testRg/providers/Microsoft.Network/virtualNetworks/testNet",
      },
    },
  );
}

/**
 * This sample demonstrates how to restores the specified backed up data. This is an asynchronous operation. To know the status of this API call, use
 * GetProtectedItemOperationResult API.
 *
 * @summary restores the specified backed up data. This is an asynchronous operation. To know the status of this API call, use
 * GetProtectedItemOperationResult API.
 * x-ms-original-file: 2026-07-01/AzureIaasVm/TriggerRestore_ResourceGuardEnabled.json
 */
async function restoreWithResourceGuardEnabled(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  await client.restores.trigger(
    "testVault",
    "netsdktestrg",
    "Azure",
    "IaasVMContainer;iaasvmcontainerv2;netsdktestrg;netvmtestv2vm1",
    "VM;iaasvmcontainerv2;netsdktestrg;netvmtestv2vm1",
    "348916168024334",
    {
      properties: {
        createNewCloudService: true,
        encryptionDetails: { encryptionEnabled: false },
        identityBasedRestoreDetails: {
          targetStorageAccountId:
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/testingRg/providers/Microsoft.Storage/storageAccounts/testAccount",
        },
        identityInfo: {
          isSystemAssignedIdentity: false,
          managedIdentityResourceId:
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/asmaskarRG1/providers/Microsoft.ManagedIdentity/userAssignedIdentities/asmaskartestmsi",
        },
        objectType: "IaasVMRestoreRequest",
        originalStorageAccountOption: false,
        recoveryPointId: "348916168024334",
        recoveryType: "RestoreDisks",
        region: "southeastasia",
        resourceGuardOperationRequests: [
          "/subscriptions/063bf7bc-e4dc-4cde-8840-8416fbd7921e/resourcegroups/ankurRG1/providers/Microsoft.DataProtection/resourceGuards/RG341/triggerRestoreRequests/default",
        ],
        sourceResourceId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/netsdktestrg/providers/Microsoft.Compute/virtualMachines/netvmtestv2vm1",
      },
    },
  );
}

/**
 * This sample demonstrates how to restores the specified backed up data. This is an asynchronous operation. To know the status of this API call, use
 * GetProtectedItemOperationResult API.
 *
 * @summary restores the specified backed up data. This is an asynchronous operation. To know the status of this API call, use
 * GetProtectedItemOperationResult API.
 * x-ms-original-file: 2026-07-01/AzureIaasVm/TriggerRestore_RestoreDisks_IaasVMRestoreRequest.json
 */
async function restoreDisksWithIaasVMRestoreRequest(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  await client.restores.trigger(
    "testVault",
    "netsdktestrg",
    "Azure",
    "IaasVMContainer;iaasvmcontainerv2;netsdktestrg;netvmtestv2vm1",
    "VM;iaasvmcontainerv2;netsdktestrg;netvmtestv2vm1",
    "348916168024334",
    {
      properties: {
        createNewCloudService: true,
        encryptionDetails: { encryptionEnabled: false },
        identityInfo: {
          isSystemAssignedIdentity: false,
          managedIdentityResourceId:
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/asmaskarRG1/providers/Microsoft.ManagedIdentity/userAssignedIdentities/asmaskartestmsi",
        },
        objectType: "IaasVMRestoreRequest",
        originalStorageAccountOption: false,
        recoveryPointId: "348916168024334",
        recoveryType: "RestoreDisks",
        region: "southeastasia",
        sourceResourceId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/netsdktestrg/providers/Microsoft.Compute/virtualMachines/netvmtestv2vm1",
        storageAccountId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/testingRg/providers/Microsoft.Storage/storageAccounts/testAccount",
        targetDiskNetworkAccessSettings: {
          targetDiskAccessId:
            "/subscriptions/e7a191f5-713c-4bdb-b5e4-cf3dd90230ef/resourceGroups/arpja/providers/Microsoft.Compute/diskAccesses/arpja-diskaccess-ccy",
          targetDiskNetworkAccessOption: "EnablePrivateAccessForAllDisks",
        },
      },
    },
  );
}

/**
 * This sample demonstrates how to restores the specified backed up data. This is an asynchronous operation. To know the status of this API call, use
 * GetProtectedItemOperationResult API.
 *
 * @summary restores the specified backed up data. This is an asynchronous operation. To know the status of this API call, use
 * GetProtectedItemOperationResult API.
 * x-ms-original-file: 2026-07-01/AzureIaasVm/TriggerRestore_RestoreDisks_IaasVMRestoreRequest_IdentityBasedRestoreDetails.json
 */
async function restoreDisksWithIaasVMRestoreRequestWithIdentityBasedRestoreDetails(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  await client.restores.trigger(
    "testVault",
    "netsdktestrg",
    "Azure",
    "IaasVMContainer;iaasvmcontainerv2;netsdktestrg;netvmtestv2vm1",
    "VM;iaasvmcontainerv2;netsdktestrg;netvmtestv2vm1",
    "348916168024334",
    {
      properties: {
        createNewCloudService: true,
        encryptionDetails: { encryptionEnabled: false },
        identityBasedRestoreDetails: {
          targetStorageAccountId:
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/testingRg/providers/Microsoft.Storage/storageAccounts/testAccount",
        },
        identityInfo: {
          isSystemAssignedIdentity: false,
          managedIdentityResourceId:
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/asmaskarRG1/providers/Microsoft.ManagedIdentity/userAssignedIdentities/asmaskartestmsi",
        },
        objectType: "IaasVMRestoreRequest",
        originalStorageAccountOption: false,
        recoveryPointId: "348916168024334",
        recoveryType: "RestoreDisks",
        region: "southeastasia",
        sourceResourceId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/netsdktestrg/providers/Microsoft.Compute/virtualMachines/netvmtestv2vm1",
      },
    },
  );
}

/**
 * This sample demonstrates how to restores the specified backed up data. This is an asynchronous operation. To know the status of this API call, use
 * GetProtectedItemOperationResult API.
 *
 * @summary restores the specified backed up data. This is an asynchronous operation. To know the status of this API call, use
 * GetProtectedItemOperationResult API.
 * x-ms-original-file: 2026-07-01/AzureIaasVm/TriggerRestore_RestoreDisks_IaasVMRestoreWithRehydrationRequest.json
 */
async function restoreDisksWithIaasVMRestoreWithRehydrationRequest(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  await client.restores.trigger(
    "testVault",
    "netsdktestrg",
    "Azure",
    "IaasVMContainer;iaasvmcontainerv2;netsdktestrg;netvmtestv2vm1",
    "VM;iaasvmcontainerv2;netsdktestrg;netvmtestv2vm1",
    "348916168024334",
    {
      properties: {
        createNewCloudService: true,
        encryptionDetails: { encryptionEnabled: false },
        objectType: "IaasVMRestoreWithRehydrationRequest",
        originalStorageAccountOption: false,
        recoveryPointId: "348916168024334",
        recoveryPointRehydrationInfo: {
          rehydrationPriority: "Standard",
          rehydrationRetentionDuration: "P7D",
        },
        recoveryType: "RestoreDisks",
        region: "southeastasia",
        sourceResourceId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/netsdktestrg/providers/Microsoft.Compute/virtualMachines/netvmtestv2vm1",
        storageAccountId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/testingRg/providers/Microsoft.Storage/storageAccounts/testAccount",
      },
    },
  );
}

/**
 * This sample demonstrates how to restores the specified backed up data. This is an asynchronous operation. To know the status of this API call, use
 * GetProtectedItemOperationResult API.
 *
 * @summary restores the specified backed up data. This is an asynchronous operation. To know the status of this API call, use
 * GetProtectedItemOperationResult API.
 * x-ms-original-file: 2026-07-01/AzureStorage/TriggerRestore_AzureFileShare_WithSAMI.json
 */
async function restoreAzureFileShareToOriginalLocationWithManagedIdentity(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  await client.restores.trigger(
    "swaggertestvault",
    "SwaggerTestRg",
    "Azure",
    "StorageContainer;Storage;SwaggerTestRg;swaggertestsa",
    "AzureFileShare;testshare",
    "932886657837421071",
    {
      properties: {
        objectType: "AzureFileShareRestoreRequest",
        recoveryType: "OriginalLocation",
        sourceResourceId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/SwaggerTestRg/providers/Microsoft.Storage/storageAccounts/swaggertestsa",
        copyOptions: "Overwrite",
        restoreRequestType: "FullShareRestore",
        identityInfo: { isSystemAssignedIdentity: true },
      },
    },
  );
}

/**
 * This sample demonstrates how to restores the specified backed up data. This is an asynchronous operation. To know the status of this API call, use
 * GetProtectedItemOperationResult API.
 *
 * @summary restores the specified backed up data. This is an asynchronous operation. To know the status of this API call, use
 * GetProtectedItemOperationResult API.
 * x-ms-original-file: 2026-07-01/AzureStorage/TriggerRestore_AzureFileShare_WithUAMI.json
 */
async function restoreAzureFileShareToOriginalLocationWithUserAssignedManagedIdentity(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  await client.restores.trigger(
    "swaggertestvault",
    "SwaggerTestRg",
    "Azure",
    "StorageContainer;Storage;SwaggerTestRg;swaggertestsa",
    "AzureFileShare;testshare",
    "932886657837421071",
    {
      properties: {
        objectType: "AzureFileShareRestoreRequest",
        recoveryType: "OriginalLocation",
        sourceResourceId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/SwaggerTestRg/providers/Microsoft.Storage/storageAccounts/swaggertestsa",
        copyOptions: "Overwrite",
        restoreRequestType: "FullShareRestore",
        identityInfo: {
          isSystemAssignedIdentity: false,
          managedIdentityResourceId:
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/SwaggerTestRg/providers/Microsoft.ManagedIdentity/userAssignedIdentities/swaggertestuami",
        },
      },
    },
  );
}

async function main(): Promise<void> {
  await restoreToNewAzureIaasVmWithIaasVMRestoreRequest();
  await restoreToNewAzureIaasVmWithIaasVMRestoreRequestWithIdentityBasedRestoreDetailsAndPerDiskEncryptionSettings();
  await restoreToNewAzureIaasVmWithIaasVMRestoreRequestWithIdentityBasedRestoreDetailsAndDataDiskEncryptionSettings();
  await restoreToNewAzureIaasVmWithIaasVMRestoreRequestWithIdentityBasedRestoreDetails();
  await restoreToNewAzureIaasVmWithIaasVMRestoreWithRehydrationRequest();
  await restoreWithResourceGuardEnabled();
  await restoreDisksWithIaasVMRestoreRequest();
  await restoreDisksWithIaasVMRestoreRequestWithIdentityBasedRestoreDetails();
  await restoreDisksWithIaasVMRestoreWithRehydrationRequest();
  await restoreAzureFileShareToOriginalLocationWithManagedIdentity();
  await restoreAzureFileShareToOriginalLocationWithUserAssignedManagedIdentity();
}

main().catch(console.error);
